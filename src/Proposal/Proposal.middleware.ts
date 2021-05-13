import {NextFunction, Request, Response} from "express";

export function validateProposalId(req: Request, res: Response, next: NextFunction) {
    const id: number | undefined = Number(req.params.id);
    if (!Number.isNaN(id)) next();
    else res.status(400).send({message: "Proposal id must be a number"});
}

export function validateCreateProposal(req: Request, res: Response, next: NextFunction) {
    const {title, description, topicId}: { title: string | undefined, description: string | undefined, topicId: number | undefined } = req.body;
    if (Boolean(title) && Boolean(description) && Boolean(topicId) && !Number.isNaN(topicId)) next();
    else res.status(400).send({message: "Title and description are required"});
}