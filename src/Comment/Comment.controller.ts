import {Request, Response} from "express";

import {ICommentsRepository} from "./Comment.repository";
import {ICommentDTO} from "./Comment.types";

export class CommentController {
    private readonly commentRepository: ICommentsRepository;

    constructor(commentRepository: ICommentsRepository) {
        this.commentRepository = commentRepository;
    }

    async addCommentToProposal(req: Request, res: Response) {
        const {comment, authorId, proposalId}: { comment: string, authorId: number, proposalId: number } = req.body;
        const commentDTO: ICommentDTO = await this.commentRepository.create(comment, 1, proposalId);
        res.send(commentDTO);
    }
}