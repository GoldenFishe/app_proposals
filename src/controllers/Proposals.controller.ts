import {Request, Response} from "express";
import ProposalsService from "../services/Proposals.service";

class ProposalsController {
    async getAll(req: Request, res: Response) {
        const proposals = await ProposalsService.selectAll();
        res.send(proposals);
    }

    async getById(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const proposal = await ProposalsService.selectById(id);
        res.send(proposal);
    }

    async create(req: Request, res: Response) {
        const {title, description}: { title: string, description: string} = req.body;
        const proposal = await ProposalsService.add(title, description, 0);
        res.send(proposal);
    }
}

export default new ProposalsController();