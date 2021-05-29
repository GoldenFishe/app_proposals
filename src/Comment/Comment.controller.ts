import {Request, Response} from "express";

import {ICommentsRepository} from "./Comment.repository";

export interface ICommentController {

    create(req: Request, res: Response): Promise<void>;

    like(req: Request, res: Response): Promise<void>;

    dislike(req: Request, res: Response): Promise<void>;
}

export class CommentController implements ICommentController {
    private readonly commentRepository: ICommentsRepository;

    constructor(commentRepository: ICommentsRepository) {
        this.commentRepository = commentRepository;
    }

    async create(req: Request, res: Response) {
        const {
            commentText,
            proposalId,
            parentCommentId
        }: { commentText: string, proposalId: number, parentCommentId: number | undefined } = req.body;
        const authorId: number = res.locals.userId;
        const attachments = req.files as Express.Multer.File[];
        const filenames = attachments.map(file => file.filename);
        const commentDTO = await this.commentRepository.insert({commentText, authorId, proposalId, parentCommentId, filenames});
        res.send(commentDTO);
    }

    async like(req: Request, res: Response) {
        const {commentId}: { commentId: number } = req.body;
        const userId: number = res.locals.userId;
        const commentDTO = await this.commentRepository.setLike(commentId, userId);
        res.send(commentDTO);
    }

    async dislike(req: Request, res: Response) {
        const {commentId}: { commentId: number } = req.body;
        const userId: number = res.locals.userId;
        const commentDTO = await this.commentRepository.setDislike(commentId, userId);
        res.send(commentDTO);
    }
}