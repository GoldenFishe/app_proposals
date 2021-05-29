import {Request, Response} from "express";

import {IProposalRepository} from "./Proposal.repository";

export interface IProposalController {

    getAll(req: Request, res: Response): Promise<void>;

    getById(req: Request, res: Response): Promise<void>;

    create(req: Request, res: Response): Promise<void>;

    like(req: Request, res: Response): Promise<void>;

    dislike(req: Request, res: Response): Promise<void>;
}

export class ProposalController implements IProposalController {
    private readonly proposalRepository: IProposalRepository;

    constructor(proposalRepository: IProposalRepository) {
        this.proposalRepository = proposalRepository;
    }

    async getAll(req: Request, res: Response) {
        const userId: number = res.locals.userId;
        const proposals = await this.proposalRepository.selectAll(userId);
        res.send(proposals);
    }

    async getById(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const userId: number = res.locals.userId;
        const proposal = await this.proposalRepository.selectById(id, userId);
        res.send(proposal);
    }

    async create(req: Request, res: Response) {
        const {title, description, topicId}: { title: string, description: string, topicId: number } = req.body;
        const authorId: number = res.locals.userId;
        const attachments = req.files as Express.Multer.File[];
        const filenames = attachments.map(file => file.filename);
        const proposal = await this.proposalRepository.insert({title, description, authorId, topicId, filenames});
        res.send(proposal);
    }

    async like(req: Request, res: Response) {
        const {proposalId}: { proposalId: number } = req.body;
        const userId: number = res.locals.userId;
        const proposal = await this.proposalRepository.toggleLike(proposalId, userId);
        res.send(proposal);
    }

    async dislike(req: Request, res: Response) {
        const {proposalId}: { proposalId: number } = req.body;
        const userId: number = res.locals.userId;
        const proposal = await this.proposalRepository.toggleDislike(proposalId, userId);
        res.send(proposal);
    }
}