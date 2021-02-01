import {Request, Response} from "express";
import {IProposalsService} from "./Proposal.service";

export class ProposalController {
    proposalsService: IProposalsService;

    constructor(proposalsService: IProposalsService) {
        this.proposalsService = proposalsService;
    }

    async getAll(req: Request, res: Response) {
        const proposals = await this.proposalsService.selectAll();
        res.send(proposals);
    }

    async getById(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const proposal = await this.proposalsService.selectById(id);
        res.send(proposal);
    }

    async create(req: Request, res: Response) {
        const {title, description}: { title: string, description: string } = req.body;
        const proposal = await this.proposalsService.add(title, description, 0);
        res.send(proposal);
    }
}