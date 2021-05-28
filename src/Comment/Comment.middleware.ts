import {NextFunction, Request, Response} from "express";

export function validateCreateComment(req: Request, res: Response, next: NextFunction) {
    const comment: string | undefined = req.body.comment;
    const proposalId: number | undefined = Number(req.body.proposalId);
    if (
        Boolean(comment) &&
        !Number.isNaN(proposalId) &&
        Array.isArray(req.files)
    ) next();
    else res.status(400).send({message: "Comment, authorId, proposalId are required"});
}