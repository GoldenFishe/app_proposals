import {query} from "../db";
import {ProposalMapper} from "./Proposal.mapper";
import {CommentMapper} from "../Comment/Comment.mapper";
import {IProposal, IProposalDTO, ITopic} from "./Proposal.types";
import {IComment} from "../Comment/Comment.types";
import {IUser} from "../User/User.types";

export interface IProposalRepository {
    selectAllProposals(): Promise<IProposalDTO[]>;

    selectProposalById(id: number): Promise<IProposalDTO>;

    addProposal(title: string, description: string, authorId: number, topicId: number): Promise<IProposalDTO>;

    setLike(proposalId: number, userId: number): Promise<IProposalDTO>;

    setDislike(proposalId: number, userId: number): Promise<IProposalDTO>;
}

export class ProposalRepository implements IProposalRepository {
    async selectAllProposals() {
        const proposalsPromise: Promise<IProposal[]> = query('SELECT * FROM proposals');
        const commentsPromise: Promise<IComment[]> = query('SELECT * FROM comments');
        const usersPromise: Promise<IUser[]> = query('SELECT * FROM users');
        const topicsPromise: Promise<ITopic[]> = query('SELECT * FROM topics');
        const [proposals, comments, users, topics] = await Promise.all([proposalsPromise, commentsPromise, usersPromise, topicsPromise]);
        return proposals.map(proposal => {
            const proposalComments = comments
                .filter(comment => comment.proposal_id === proposal.id)
                .map(comment => {
                    const author = users.find(user => user.id === comment.author_id);
                    return CommentMapper.toDTO(comment, author!);
                });
            const author = users.find(user => user.id === proposal.author_id);
            const proposalTopic = topics.find(topic => proposal.topic_id === topic.id);
            return ProposalMapper.toDTO(proposal, proposalComments, author!, proposalTopic!);
        });
    }

    async selectProposalById(id: number) {
        const [proposal]: IProposal[] = await query(`SELECT * FROM proposals WHERE id=${id}`);
        const comments: IComment[] = await query(`SELECT * FROM comments WHERE proposal_id=${proposal.id}`);
        const [author]: IUser[] = await query(`SELECT * FROM users WHERE id=${proposal.author_id}`);
        const [topic]: ITopic[] = await query(`SELECT * FROM topics WHERE id=${proposal.topic_id}`);
        const users: IUser[] = await query(`SELECT * FROM users`);
        const commentsDTO = comments.map(comment => {
            const author = users.find(user => user.id === comment.author_id);
            return CommentMapper.toDTO(comment, author!);
        });
        return ProposalMapper.toDTO(proposal, commentsDTO, author, topic);
    }

    async addProposal(title: string, description: string, authorId: number, topicId: number) {
        const proposalsPromise: Promise<IProposal[]> = query(`INSERT INTO proposals (title, description, author_id, topic_id) VALUES ('${title}', '${description}', ${authorId}, '${topicId}') RETURNING *`);
        const usersPromise: Promise<IUser[]> = query(`SELECT * FROM users WHERE id=${authorId}`);
        const topicsPromise: Promise<ITopic[]> = query(`SELECT * FROM topics WHERE id=${topicId}`);
        const [proposals, users, topics] = await Promise.all([proposalsPromise, usersPromise, topicsPromise]);
        const [proposal] = proposals;
        const [user] = users;
        const [topic] = topics;
        return ProposalMapper.toDTO(proposal, [], user, topic);
    }

    async setLike(proposalId: number, userId: number) {
        const [proposal]: IProposal[] = await query(`INSERT INTO proposals_likes (proposal_id, user_id) VALUES (${proposalId}, ${userId}) RETURNING *`);
        return this.selectProposalById(proposal.id);
    }

    async setDislike(proposalId: number, userId: number) {
        const [proposal]: IProposal[] = await query(`INSERT INTO proposals_dislikes (proposal_id, user_id) VALUES (${proposalId}, ${userId}) RETURNING *`);
        return this.selectProposalById(proposal.id);
    }
}