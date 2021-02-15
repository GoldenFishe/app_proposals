import {query} from "../db";
import {ProposalMapper} from "./Proposal.mapper";
import {IProposalDTO} from "./Proposal.dto";

export interface IProposal {
    id: number;
    title: string;
    description: string;
    author_id: number;
    rating: number;
}

export interface IProposalRepository {
    selectAllProposals(): Promise<IProposalDTO[]>;

    selectProposalById(id: number): Promise<IProposalDTO>;

    addProposal(title: string, description: string, authorId: number): Promise<IProposalDTO>;
}

export class ProposalRepository implements IProposalRepository {
    async selectAllProposals(): Promise<IProposalDTO[]> {
        const proposals = await query('SELECT * FROM proposals');
        return proposals.map(ProposalMapper.toDTO);
    }

    async selectProposalById(id: number): Promise<IProposalDTO> {
        const [proposal]: IProposal[] = await query(`SELECT * FROM proposals WHERE id=${id}`);
        return ProposalMapper.toDTO(proposal);
    }

    async addProposal(title: string, description: string, authorId: number): Promise<IProposalDTO> {
        const [proposal]: IProposal[] = await query(`INSERT INTO proposals (title, description, author_id) VALUES ('${title}', '${description}', ${authorId}) RETURNING *`);
        return ProposalMapper.toDTO(proposal);
    }
}