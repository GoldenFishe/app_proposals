import {query} from "../db";
import {CommentMapper} from "./Comment.mapper";
import {IComment, ICommentDTO} from "./Comments.types";

export interface ICommentsRepository {
    create(commentText: string, authorId: number, proposalId: number): Promise<ICommentDTO>;
}

export class CommentRepository implements ICommentsRepository {
    async create(commentText: string, authorId: number, proposalId: number) {
        const [comment]: IComment[] = await query(`INSERT INTO comments (comment, author_id, proposal_id) VALUES ('${commentText}', ${authorId}, ${proposalId}) RETURNING *`);
        return CommentMapper.toDTO(comment);
    }
}