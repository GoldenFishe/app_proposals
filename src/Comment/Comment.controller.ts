import {Request, Response} from "express";

import {ICommentsRepository} from "./Comment.repository";

export class CommentController {
    private readonly commentRepository: ICommentsRepository;

    constructor(commentRepository: ICommentsRepository) {
        this.commentRepository = commentRepository;
    }

    async addCommentToProposal(req: Request, res: Response) {
        const {comment, proposalId, parentCommentId}: { comment: string, proposalId: number, parentCommentId: number } = req.body;
        const userId: number = res.locals.userId;
        const commentDTO = await this.commentRepository.create(comment, userId, proposalId, parentCommentId);
        res.send(commentDTO);
    }

    async likeComment(req: Request, res: Response) {
        const {commentId}: { commentId: number } = req.body;
        const userId: number = res.locals.userId;
        const commentDTO = await this.commentRepository.setLike(commentId, userId);
        res.send(commentDTO);
    }

    async dislikeComment(req: Request, res: Response) {
        const {commentId}: { commentId: number } = req.body;
        const userId: number = res.locals.userId;
        const commentDTO = await this.commentRepository.setDislike(commentId, userId);
        res.send(commentDTO);
    }
}