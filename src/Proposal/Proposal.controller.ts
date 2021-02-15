import {Request, Response} from "express";
import {IProposalRepository} from "./Proposal.repository";

export class ProposalController {
    proposalRepository: IProposalRepository;

    constructor(proposalsService: IProposalRepository) {
        this.proposalRepository = proposalsService;
    }

    async getAll(req: Request, res: Response) {
        const proposals = await this.proposalRepository.selectAllProposals();
        res.send(proposals);
    }

    async getById(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const proposal = await this.proposalRepository.selectProposalById(id);
        res.send(proposal);
    }

    async create(req: Request, res: Response) {
        const {title, description}: { title: string, description: string } = req.body;
        const proposal = await this.proposalRepository.addProposal(title, description, 0);
        res.send(proposal);
    }
}