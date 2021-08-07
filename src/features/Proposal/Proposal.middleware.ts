import {NextFunction, Request, Response} from "express";

export function validateProposalId(req: Request, res: Response, next: NextFunction) {
    const id: number | undefined = Number(req.params.id);
    if (!Number.isNaN(id)) next();
    else res.status(400).send({message: "Proposal id must be a number"});
}

type CreateProposalBody = {
    title: string,
    description: string,
    tagsIds: string;
}

export function validateCreateProposal(req: Request, res: Response, next: NextFunction) {
    const {title, description, tagsIds}: CreateProposalBody = req.body;
    if (Boolean(title) && Boolean(description) && Boolean(tagsIds) && Array.isArray(JSON.parse(tagsIds)) && Array.isArray(req.files)) next();
    else res.status(400).send({message: "Title and description are required"});
}