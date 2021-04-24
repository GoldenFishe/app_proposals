import {Request, Response} from "express";

import {ICommentsRepository} from "./Comment.repository";
import {ICommentDTO} from "./Comments.types";

export class CommentController {
    private readonly commentRepository: ICommentsRepository;

    constructor(commentRepository: ICommentsRepository) {
        this.commentRepository = commentRepository;
    }

    async addCommentToProposal(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const {comment, authorId}: { comment: string, authorId: number } = req.body;
        const commentDTO: ICommentDTO = await this.commentRepository.create(comment, authorId, id);
        res.send(commentDTO);
    }
}