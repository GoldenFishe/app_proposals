import {query} from "../../utils/db";
import {ProposalMapper} from "./Proposal.mapper";
import {CommentMapper} from "../Comment/Comment.mapper";
import {
    INewProposal,
    IProposal,
    IProposalAttachment,
    IProposalDTO,
    IProposalPreview,
    IProposalPreviewDTO
} from "./Proposal.types";
import {IComment, ICommentAttachment} from "../Comment/Comment.types";

export interface IProposalRepository {

    selectAll(userId: number): Promise<IProposalPreviewDTO[]>;

    selectById(id: number, userId: number): Promise<IProposalDTO>;

    insert(data: INewProposal): Promise<IProposalDTO>;

    toggleLike(proposalId: number, userId: number): Promise<IProposalDTO>;

    toggleDislike(proposalId: number, userId: number): Promise<IProposalDTO>;
}

export class ProposalRepository implements IProposalRepository {

    async selectAll(userId: number) {
        const proposals = await query<IProposalPreview>(`
            SELECT p.id,
                   p.title,
                   p.description,
                   p.author_id,
                   u.username                                                "author_username",
                   u.avatar_filename                                         "author_avatar",
                   p.topic_id,
                   t.topic,
                   p.create_date,
                   COUNT(pl)                                                 "likes",
                   COUNT(pd)                                                 "dislikes",
                   CASE WHEN pl.user_id = ${userId} THEN TRUE ELSE FALSE END is_liked,
                   CASE WHEN pd.user_id = ${userId} THEN TRUE ELSE FALSE END is_disliked,
                   COUNT(c)                                                  "comments_quantity"
            FROM proposals p
                     JOIN users u ON u.id = p.author_id
                     JOIN topics t ON t.id = p.topic_id
                     LEFT OUTER JOIN proposals_likes pl ON p.id = pl.proposal_id
                     LEFT OUTER JOIN proposals_dislikes pd ON p.id = pd.proposal_id
                     LEFT OUTER JOIN comments c ON p.id = c.proposal_id
            GROUP BY p.id,
                     p.title,
                     p.description,
                     p.author_id,
                     u.username,
                     u.avatar_filename,
                     p.topic_id,
                     t.topic,
                     p.create_date,
                     pl.user_id,
                     pd.user_id
        `);
        return proposals.map(proposal => ProposalMapper.toPreviewDTO(proposal));
    }

    async selectById(id: number, userId: number) {
        const [proposal] = await query<IProposal>(`
            SELECT p.id,
                   p.title,
                   p.description,
                   p.author_id,
                   u.username                                                "author_username",
                   u.avatar_filename                                         "author_avatar",
                   p.topic_id,
                   t.topic,
                   p.create_date,
                   COUNT(pl)                                                 "likes",
                   COUNT(pd)                                                 "dislikes",
                   CASE WHEN pl.user_id = ${userId} THEN TRUE ELSE FALSE END is_liked,
                   CASE WHEN pd.user_id = ${userId} THEN TRUE ELSE FALSE END is_disliked,
                   COUNT(c)                                                  "comments_quantity"
            FROM proposals p
                     JOIN users u ON u.id = p.author_id
                     JOIN topics t ON t.id = p.topic_id
                     LEFT OUTER JOIN proposals_likes pl ON p.id = pl.proposal_id
                     LEFT OUTER JOIN proposals_dislikes pd ON p.id = pd.proposal_id
                     LEFT OUTER JOIN comments c ON p.id = c.proposal_id
            WHERE p.id = ${id}
            GROUP BY p.id,
                     p.title,
                     p.description,
                     p.author_id,
                     u.username,
                     u.avatar_filename,
                     p.topic_id,
                     t.topic,
                     p.create_date,
                     pl.user_id,
                     pd.user_id
        `);
        const proposalAttachments = await query<IProposalAttachment>(`
            SELECT *
            FROM proposal_attachments
            WHERE proposal_id = ${proposal.id}
        `);
        const comments = await query<IComment>(`
            SELECT c.id,
                   c.comment,
                   c.author_id,
                   u.username                                                "author_username",
                   u.avatar_filename                                         "author_avatar",
                   c.proposal_id,
                   c.create_date,
                   COUNT(cl)                                                 "likes",
                   COUNT(cd)                                                 "dislikes",
                   CASE WHEN cl.user_id = ${userId} THEN TRUE ELSE FALSE END is_liked,
                   CASE WHEN cd.user_id = ${userId} THEN TRUE ELSE FALSE END is_disliked,
                   c.parent_comment_id
            FROM comments c
                     JOIN users u ON u.id = c.author_id
                     LEFT OUTER JOIN comments_likes cl ON c.id = cl.comment_id
                     LEFT OUTER JOIN comments_dislikes cd ON c.id = cd.comment_id
            WHERE c.proposal_id = ${id}
            GROUP BY c.id,
                     c.comment,
                     c.author_id,
                     u.username,
                     u.avatar_filename,
                     c.proposal_id,
                     c.create_date,
                     cl.user_id,
                     cd.user_id,
                     c.parent_comment_id
        `);
        const commentAttachments = await query<ICommentAttachment>(`
            SELECT *
            FROM comment_attachments
        `);
        const commentsDTO = comments.map(comment => {
            const attachments = commentAttachments.filter(attachment => attachment.comment_id === comment.id);
            return CommentMapper.toDTO(comment, attachments);
        });
        return ProposalMapper.toDTO(proposal, commentsDTO, proposalAttachments);
    }

    async insert(data: INewProposal) {
        const {title, description, authorId, topicId, filenames} = data;
        const [{id}] = await query<{ id: IProposal["id"] }>(`
            INSERT INTO proposals (title, description, author_id, topic_id)
            VALUES ('${title}', '${description}', ${authorId}, ${topicId})
            RETURNING id;
        `);
        const attachmentsPromise: Array<Promise<IProposalAttachment[]>> = filenames.map(filename => {
            return query<IProposalAttachment>(`
                INSERT INTO proposal_attachments (proposal_id, filename)
                VALUES (${id}, '${filename}')
                RETURNING *
            `);
        });
        await Promise.all(attachmentsPromise);
        return this.selectById(id, authorId);
    }

    async toggleLike(proposalId: number, userId: number) {
        const [id] = await query<{ id: number }>(`
            SELECT id
            FROM proposals_likes
            WHERE proposal_id = ${proposalId}
              AND user_id = ${userId}
        `);
        return Boolean(id) ? this.unsetLike(proposalId, userId) : this.setLike(proposalId, userId);
    }

    async toggleDislike(proposalId: number, userId: number) {
        const [id] = await query<{ id: number }>(`
            SELECT id
            FROM proposals_dislikes
            WHERE proposal_id = ${proposalId}
              AND user_id = ${userId}
        `);
        return Boolean(id) ? this.unsetDislike(proposalId, userId) : this.setDislike(proposalId, userId);
    }

    private async setLike(proposalId: number, userId: number) {
        await query<IProposal>(`
            INSERT INTO proposals_likes (proposal_id, user_id)
            VALUES (${proposalId}, ${userId})
        `);
        await this.unsetDislike(proposalId, userId);
        return this.selectById(proposalId, userId);
    }

    private async setDislike(proposalId: number, userId: number) {
        await query<IProposal>(`
            INSERT INTO proposals_dislikes (proposal_id, user_id)
            VALUES (${proposalId}, ${userId})
        `);
        await this.unsetLike(proposalId, userId);
        return this.selectById(proposalId, userId);
    }

    private async unsetLike(proposalId: number, userId: number) {
        await query<IProposal>(`
            DELETE
            FROM proposals_likes
            WHERE proposal_id = ${proposalId}
              AND user_id = ${userId}
        `);
        return this.selectById(proposalId, userId);
    }

    private async unsetDislike(proposalId: number, userId: number) {
        await query<IProposal>(`
            DELETE
            FROM proposals_dislikes
            WHERE proposal_id = ${proposalId}
              AND user_id = ${userId}
        `);
        return this.selectById(proposalId, userId);
    }
}