import {NextFunction, Request, Response} from "express";

export function validateCreateComment(req: Request, res: Response, next: NextFunction) {
    const commentText: string | undefined = req.body.commentText;
    const proposalId: number | undefined = Number(req.body.proposalId);
    if (
        Boolean(commentText) &&
        !Number.isNaN(proposalId) &&
        Array.isArray(req.files)
    ) next();
    else res.status(400).send({message: "commentText, authorId, proposalId are required"});
}