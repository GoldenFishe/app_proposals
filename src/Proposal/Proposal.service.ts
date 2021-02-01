import {IProposalRepository} from './Proposal.repository';
import {IProposalDTO} from "./Proposal.dto";

export interface IProposalsService {
    selectAll(): Promise<IProposalDTO[]>;

    selectById(id: number): Promise<IProposalDTO>;

    add(title: string, description: string, authorId: number): Promise<IProposalDTO>;
}

export class ProposalService implements IProposalsService {
    private proposalRepository: IProposalRepository;

    constructor(proposalRepository: IProposalRepository) {
        this.proposalRepository = proposalRepository;
    }

    selectAll(): Promise<IProposalDTO[]> {
        return this.proposalRepository.selectAllProposals();
    }

    selectById(id: number): Promise<IProposalDTO> {
        return this.proposalRepository.selectProposalById(id);
    }

    add(title: string, description: string, authorId: number): Promise<IProposalDTO> {
        return this.proposalRepository.addProposal(title, description, authorId);
    }
}