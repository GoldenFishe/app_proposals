import {NextFunction, Request, Response} from "express";

export function validateCreateComment(req: Request, res: Response, next: NextFunction) {
    const comment: string | undefined = req.body.comment;
    const proposalId: number | undefined = Number(req.body.proposalId);
    const parentCommentId: number | null | undefined = req.body.parentCommentId !== null ? Number(req.body.parentCommentId) : null;
    if (
        Boolean(comment) &&
        !Number.isNaN(proposalId) &&
        (!Number.isNaN(parentCommentId) || parentCommentId === null)
    ) next();
    else res.status(400).send({message: "Comment, authorId, proposalId are required"});
}