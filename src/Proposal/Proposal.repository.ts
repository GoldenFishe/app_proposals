import {query} from "../db";
import {ProposalMapper} from "./Proposal.mapper";
import {CommentMapper} from "../Comment/Comment.mapper";
import {IProposal, IProposalAttachment, IProposalDTO, ITopic} from "./Proposal.types";
import {IComment, ICommentAttachment} from "../Comment/Comment.types";
import {IUser} from "../User/User.types";

export interface IProposalRepository {
    selectAllProposals(): Promise<IProposalDTO[]>;

    selectProposalById(id: number): Promise<IProposalDTO>;

    addProposal(title: string, description: string, authorId: number, topicId: number, attachments: Array<string>): Promise<IProposalDTO>;

    setLike(proposalId: number, userId: number): Promise<IProposalDTO>;

    setDislike(proposalId: number, userId: number): Promise<IProposalDTO>;
}

export class ProposalRepository implements IProposalRepository {
    async selectAllProposals() {
        const proposalsPromise = query<IProposal>('SELECT * FROM proposals');
        const commentsPromise = query<IComment>('SELECT * FROM comments');
        const usersPromise = query<IUser>('SELECT * FROM users');
        const topicsPromise = query<ITopic>('SELECT * FROM topics');
        const proposalAttachmentsPromise = await query<IProposalAttachment>(`SELECT * FROM proposal_attachments`);
        const commentAttachmentsPromise = await query<ICommentAttachment>(`SELECT * FROM comment_attachments`);
        const [proposals, comments, users, topics, proposalAttachments, commentAttachments] = await Promise.all([proposalsPromise, commentsPromise, usersPromise, topicsPromise, proposalAttachmentsPromise, commentAttachmentsPromise]);
        return proposals.map(proposal => {
            const proposalComments = comments
                .filter(comment => comment.proposal_id === proposal.id)
                .map(comment => {
                    const author = users.find(user => user.id === comment.author_id);
                    const attachments = commentAttachments.filter(attachment => attachment.comment_id === comment.id);
                    return CommentMapper.toDTO(comment, author!, attachments);
                });
            const attachments = proposalAttachments.filter(attachment => attachment.proposal_id === proposal.id);
            const author = users.find(user => user.id === proposal.author_id);
            const proposalTopic = topics.find(topic => proposal.topic_id === topic.id);
            return ProposalMapper.toDTO(proposal, proposalComments, author!, proposalTopic!, attachments);
        });
    }

    async selectProposalById(id: number) {
        const [proposal] = await query<IProposal>(`SELECT * FROM proposals WHERE id=${id}`);
        const comments = await query<IComment>(`SELECT * FROM comments WHERE proposal_id=${proposal.id}`);
        const [author] = await query<IUser>(`SELECT * FROM users WHERE id=${proposal.author_id}`);
        const [topic] = await query<ITopic>(`SELECT * FROM topics WHERE id=${proposal.topic_id}`);
        const proposalAttachments = await query<IProposalAttachment>(`SELECT * FROM proposal_attachments WHERE proposal_id=${id}`);
        const commentAttachments = await query<ICommentAttachment>(`SELECT * FROM comment_attachments`);
        const users = await query<IUser>(`SELECT * FROM users`);
        const commentsDTO = comments.map(comment => {
            const author = users.find(user => user.id === comment.author_id);
            const attachments = commentAttachments.filter(attachment => attachment.comment_id === comment.id);
            return CommentMapper.toDTO(comment, author!, attachments);
        });
        return ProposalMapper.toDTO(proposal, commentsDTO, author, topic, proposalAttachments);
    }

    async addProposal(title: string, description: string, authorId: number, topicId: number, filenames: Array<string>) {
        const proposalsPromise = query<IProposal>(`INSERT INTO proposals (title, description, author_id, topic_id) VALUES ('${title}', '${description}', ${authorId}, '${topicId}') RETURNING *`);
        const usersPromise = query<IUser>(`SELECT * FROM users WHERE id=${authorId}`);
        const topicsPromise = query<ITopic>(`SELECT * FROM topics WHERE id=${topicId}`);
        const [proposals, users, topics] = await Promise.all([proposalsPromise, usersPromise, topicsPromise]);
        const [proposal] = proposals;
        const [user] = users;
        const [topic] = topics;
        const attachmentsPromise: Array<Promise<IProposalAttachment[]>> = filenames.map(filename => {
            return query<IProposalAttachment>(`INSERT INTO proposal_attachments (proposal_id, filename) VALUES (${proposal.id}, '${filename}') RETURNING *`);
        });
        const savedAttachments = await Promise.all(attachmentsPromise)
        return ProposalMapper.toDTO(proposal, [], user, topic, savedAttachments.map(a => a[0]));
    }

    async setLike(proposalId: number, userId: number) {
        const [proposal] = await query<IProposal>(`INSERT INTO proposals_likes (proposal_id, user_id) VALUES (${proposalId}, ${userId}) RETURNING *`);
        return this.selectProposalById(proposal.id);
    }

    async setDislike(proposalId: number, userId: number) {
        const [proposal] = await query<IProposal>(`INSERT INTO proposals_dislikes (proposal_id, user_id) VALUES (${proposalId}, ${userId}) RETURNING *`);
        return this.selectProposalById(proposal.id);
    }
}