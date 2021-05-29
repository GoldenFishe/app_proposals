import {query} from "../db";
import {CommentMapper} from "./Comment.mapper";
import {IComment, ICommentAttachment, ICommentDTO, INewComment} from "./Comment.types";

export interface ICommentsRepository {

    selectCommentsByProposalId(proposalId: number, userId: number): Promise<ICommentDTO[]>;

    insert(data: INewComment): Promise<ICommentDTO[]>;

    toggleLike(commentId: number, userId: number): Promise<ICommentDTO[]>;

    toggleDislike(commentId: number, userId: number): Promise<ICommentDTO[]>;
}

export class CommentRepository implements ICommentsRepository {

    async selectCommentsByProposalId(proposalId: number, userId: number): Promise<ICommentDTO[]> {
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
            WHERE c.proposal_id = ${proposalId}
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
        return comments.map(comment => {
            const attachments = commentAttachments.filter(attachment => attachment.comment_id === comment.id);
            return CommentMapper.toDTO(comment, attachments);
        });
    }

    async insert(data: INewComment) {
        const {commentText, authorId, proposalId, parentCommentId, filenames} = data;
        const [{id}] = await query<{ id: IComment["id"] }>(`
            INSERT INTO comments (comment, author_id, proposal_id${parentCommentId ? ', parent_comment_id' : ''})
            VALUES ('${commentText}', ${authorId}, ${proposalId}${parentCommentId ? `, ${parentCommentId}` : ''})
            RETURNING id;
        `);
        const attachmentsPromise: Array<Promise<ICommentAttachment[]>> = filenames.map(filename => {
            return query<ICommentAttachment>(`
                INSERT INTO comment_attachments (comment_id, filename)
                VALUES (${id}, '${filename}')
                RETURNING *
            `);
        });
        await Promise.all(attachmentsPromise);
        return this.selectCommentsByProposalId(proposalId, authorId);
    }

    async toggleLike(commentId: number, userId: number) {
        const [id] = await query<{ id: number }>(`
            SELECT id
            FROM comments_likes
            WHERE comment_id = ${commentId}
              AND user_id = ${userId}
        `);
        return Boolean(id) ? this.unsetLike(commentId, userId) : this.setLike(commentId, userId);
    }

    async toggleDislike(commentId: number, userId: number) {
        const [id] = await query<{ id: number }>(`
            SELECT id
            FROM comments_dislikes
            WHERE comment_id = ${commentId}
              AND user_id = ${userId}
        `);
        return Boolean(id) ? this.unsetDislike(commentId, userId) : this.setDislike(commentId, userId);
    }

    private async setLike(commentId: number, userId: number) {
        await query<IComment>(`
            INSERT INTO comments_likes (comment_id, user_id)
            VALUES (${commentId}, ${userId})
        `);
        await this.unsetDislike(commentId, userId);
        const [{proposal_id}] = await query<{ proposal_id: IComment["proposal_id"] }>(`
            SELECT proposal_id
            FROM comments
            WHERE id = ${commentId}
        `);
        return this.selectCommentsByProposalId(proposal_id, userId);
    }

    private async unsetLike(commentId: number, userId: number) {
        await query<IComment>(`
            DELETE
            FROM comments_likes
            WHERE comment_id = ${commentId}
              AND user_id = ${userId}
        `);
        const [{proposal_id}] = await query<{ proposal_id: IComment["proposal_id"] }>(`
            SELECT proposal_id
            FROM comments
            WHERE id = ${commentId}
        `);
        return this.selectCommentsByProposalId(proposal_id, userId);
    }

    private async setDislike(commentId: number, userId: number) {
        await query<IComment>(`
            INSERT INTO comments_dislikes (comment_id, user_id)
            VALUES (${commentId}, ${userId})
        `);
        await this.unsetLike(commentId, userId);
        const [{proposal_id}] = await query<{ proposal_id: IComment["proposal_id"] }>(`
            SELECT proposal_id
            FROM comments
            WHERE id = ${commentId}
        `);
        return this.selectCommentsByProposalId(proposal_id, userId);
    }

    private async unsetDislike(commentId: number, userId: number) {
        await query<IComment>(`
            DELETE
            FROM comments_dislikes
            WHERE comment_id = ${commentId}
              AND user_id = ${userId}
        `);
        const [{proposal_id}] = await query<{ proposal_id: IComment["proposal_id"] }>(`
            SELECT proposal_id
            FROM comments
            WHERE id = ${commentId}
        `);
        return this.selectCommentsByProposalId(proposal_id, userId);
    }
}