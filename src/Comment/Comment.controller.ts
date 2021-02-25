import {Request, Response} from "express";
import {ICommentsRepository} from "./Comment.repository";
import {ICommentDTO} from "./Comment.dto";

export class CommentController {
    commentRepository: ICommentsRepository;

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