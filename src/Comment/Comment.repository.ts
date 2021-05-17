import {query} from "../db";
import {CommentMapper} from "./Comment.mapper";
import {IComment, ICommentDTO} from "./Comment.types";
import {IUser} from "../User/User.types";

export interface ICommentsRepository {
    create(commentText: string, authorId: number, proposalId: number, parentCommentId: number): Promise<ICommentDTO>;

    setLike(commentId: number, userId: number): Promise<ICommentDTO>;

    setDislike(commentId: number, userId: number): Promise<ICommentDTO>;
}

export class CommentRepository implements ICommentsRepository {
    async create(commentText: string, authorId: number, proposalId: number, parentCommentId: number) {
        const [comment]: IComment[] = await query(`INSERT INTO comments (comment, author_id, proposal_id, parent_comment_id) VALUES ('${commentText}', ${authorId}, ${proposalId}, ${parentCommentId}) RETURNING *`);
        const [user]: IUser[] = await query(`SELECT * FROM users WHERE id = ${authorId}`);
        return CommentMapper.toDTO(comment, user);
    }

    async setLike(commentId: number, userId: number) {
        const [comment]: IComment[] = await query(`INSERT INTO comments_likes (comment_id, user_id) VALUES (${commentId}, ${userId}) RETURNING *`);
        const [user]: IUser[] = await query(`SELECT * FROM users WHERE id = ${userId}`);
        return CommentMapper.toDTO(comment, user);
    }

    async setDislike(commentId: number, userId: number) {
        const [comment]: IComment[] = await query(`INSERT INTO comments_dislikes (comment_id, user_id) VALUES (${commentId}, ${userId}) RETURNING *`);
        const [user]: IUser[] = await query(`SELECT * FROM users WHERE id = ${userId}`);
        return CommentMapper.toDTO(comment, user);
    }
}