import {Request, Response} from "express";

import {ICommentsRepository} from "./Comment.repository";

export interface ICommentController {

    addCommentToProposal(req: Request, res: Response): Promise<void>;

    likeComment(req: Request, res: Response): Promise<void>;

    dislikeComment(req: Request, res: Response): Promise<void>;
}

export class CommentController implements ICommentController {
    private readonly commentRepository: ICommentsRepository;

    constructor(commentRepository: ICommentsRepository) {
        this.commentRepository = commentRepository;
    }

    async addCommentToProposal(req: Request, res: Response) {
        const {
            comment,
            proposalId,
            parentCommentId
        }: { comment: string, proposalId: number, parentCommentId: number } = req.body;
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