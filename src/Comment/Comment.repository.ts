import {query} from "../db";
import {CommentMapper} from "./Comment.mapper";
import {IComment, ICommentAttachment, ICommentDTO} from "./Comment.types";
import {IUser} from "../User/User.types";

export interface ICommentsRepository {
    addComment(commentText: string, authorId: number, proposalId: number, parentCommentId: number | undefined, filenames: Array<string>): Promise<ICommentDTO>;

    setLike(commentId: number, userId: number): Promise<ICommentDTO>;

    setDislike(commentId: number, userId: number): Promise<ICommentDTO>;
}

export class CommentRepository implements ICommentsRepository {
    async addComment(commentText: string, authorId: number, proposalId: number, parentCommentId: number | undefined, filenames: Array<string>) {
        const [comment] = await query<IComment>(`INSERT INTO comments (comment, author_id, proposal_id${parentCommentId ? ', parent_comment_id' : ''}) VALUES ('${commentText}', ${authorId}, ${proposalId}${parentCommentId ? `, ${parentCommentId}` : ''}) RETURNING *`);
        const [user] = await query<IUser>(`SELECT * FROM users WHERE id = ${authorId}`);
        const attachmentsPromise: Array<Promise<ICommentAttachment[]>> = filenames.map(filename => {
            return query<ICommentAttachment>(`INSERT INTO comment_attachments (comment_id, filename) VALUES (${comment.id}, '${filename}') RETURNING *`);
        });
        const savedAttachments = await Promise.all(attachmentsPromise)
        return CommentMapper.toDTO(comment, user, savedAttachments.map(a => a[0]));
    }

    async setLike(commentId: number, userId: number) {
        const [comment] = await query<IComment>(`INSERT INTO comments_likes (comment_id, user_id) VALUES (${commentId}, ${userId}) RETURNING *`);
        const [user] = await query<IUser>(`SELECT * FROM users WHERE id = ${userId}`);
        const attachments = await query<ICommentAttachment>(`SELECT * FROM comment_attachments WHERE comment_id = ${comment.id}`);
        return CommentMapper.toDTO(comment, user, attachments);
    }

    async setDislike(commentId: number, userId: number) {
        const [comment] = await query<IComment>(`INSERT INTO comments_dislikes (comment_id, user_id) VALUES (${commentId}, ${userId}) RETURNING *`);
        const [user] = await query<IUser>(`SELECT * FROM users WHERE id = ${userId}`);
        const attachments = await query<ICommentAttachment>(`SELECT * FROM comment_attachments WHERE comment_id = ${comment.id}`);
        return CommentMapper.toDTO(comment, user, attachments);
    }
}