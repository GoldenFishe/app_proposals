import {Request, Response} from "express";

import {IProposalRepository} from "./Proposal.repository";

export interface IProposalController {

    getAll(req: Request, res: Response): Promise<void>;

    getById(req: Request, res: Response): Promise<void>;

    create(req: Request, res: Response): Promise<void>;

    likeProposal(req: Request, res: Response): Promise<void>;

    dislikeProposal(req: Request, res: Response): Promise<void>;
}

export class ProposalController implements IProposalController {
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
        const userId: number = res.locals.userId;
        const attachments = (req.files as Array<Express.Multer.File>).map((file: Express.Multer.File) => file.filename);
        const proposal = await this.proposalRepository.addProposal(title, description, userId, topicId, attachments);
        res.send(proposal);
    }

    async likeProposal(req: Request, res: Response) {
        const {proposalId}: { proposalId: number } = req.body;
        const userId: number = res.locals.userId;
        const proposal = await this.proposalRepository.setLike(proposalId, userId);
        res.send(proposal);
    }

    async dislikeProposal(req: Request, res: Response) {
        const {proposalId}: { proposalId: number } = req.body;
        const userId: number = res.locals.userId;
        const proposal = await this.proposalRepository.setDislike(proposalId, userId);
        res.send(proposal);
    }
}