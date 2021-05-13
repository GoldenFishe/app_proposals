import {Request, Response} from "express";

import {IProposalRepository} from "./Proposal.repository";

export class ProposalController {
    private readonly proposalRepository: IProposalRepository;

    constructor(proposalRepository: IProposalRepository) {
        this.proposalRepository = proposalRepository;
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
        const {title, description, topicId}: { title: string, description: string, topicId: number } = req.body;
        const proposal = await this.proposalRepository.addProposal(title, description, 1, topicId);
        res.send(proposal);
    }
}