import {query} from "../db";
import {ProposalMapper} from "./Proposal.mapper";
import {CommentMapper} from "../Comment/Comment.mapper";
import {IProposal, IProposalDTO} from "./Proposal.types";
import {IComment} from "../Comment/Comment.types";

export interface IProposalRepository {
    selectAllProposals(): Promise<IProposalDTO[]>;

    selectProposalById(id: number): Promise<IProposalDTO>;

    addProposal(title: string, description: string, authorId: number): Promise<IProposalDTO>;
}

export class ProposalRepository implements IProposalRepository {
    async selectAllProposals() {
        const proposalsPromise: Promise<IProposal[]> = query('SELECT * FROM proposals');
        const commentsPromise: Promise<IComment[]> = query('SELECT * FROM comments');
        const [proposals, comments] = await Promise.all([proposalsPromise, commentsPromise]);
        const commentsDTO = comments.map(CommentMapper.toDTO);
        return proposals.map(proposal => {
            const proposalComments = commentsDTO.filter(comment => comment.proposalId === proposal.id);
            return ProposalMapper.toDTO(proposal, proposalComments);
        });
    }

    async selectProposalById(id: number) {
        const [proposal]: IProposal[] = await query(`SELECT * FROM proposals WHERE id=${id}`);
        const comments: IComment[] = await query(`SELECT * FROM comments WHERE proposal_id=${proposal.id}`);
        const commentsDTO = comments.map(CommentMapper.toDTO);
        return ProposalMapper.toDTO(proposal, commentsDTO);
    }

    async addProposal(title: string, description: string, authorId: number) {
        const [proposal]: IProposal[] = await query(`INSERT INTO proposals (title, description, author_id) VALUES ('${title}', '${description}', ${authorId}) RETURNING *`);
        return ProposalMapper.toDTO(proposal, []);
    }
}