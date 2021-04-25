import {NextFunction, Request, Response} from "express";

export function validateProposalId(req: Request, res: Response, next: NextFunction) {
    const id: number | undefined = Number(req.params.id);
    if (!Number.isNaN(id)) next();
    else res.status(400).send({message: "Proposal id must be a number"});
}

export function validateCreateProposal(req: Request, res: Response, next: NextFunction) {
    const {title, description}: { title: string | undefined, description: string | undefined } = req.body;
    if (Boolean(title) && Boolean(description)) next();
    else res.status(400).send({message: "Title and description are required"});
}