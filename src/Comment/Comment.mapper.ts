import {IComment, ICommentAttachment, ICommentDTO} from "./Comment.types";
import Utils from "../utils";

export class CommentMapper {
    public static toDTO(comment: IComment, attachments: ICommentAttachment[]): ICommentDTO {
        return {
            id: comment.id,
            comment: comment.comment,
            author: {
                id: comment.author_id,
                username: comment.author_username,
                avatar: comment.author_avatar && Utils.getAvatarPath(comment.author_avatar)
            },
            likes: Number(comment.likes),
            dislikes: Number(comment.dislikes),
            isDisliked: comment.is_disliked,
            isLiked: comment.is_liked,
            createDate: comment.create_date,
            parentCommentId: comment.parent_comment_id,
            attachments: attachments.map(attachment => Utils.getAttachmentPath(attachment.filename))
        }
    }
}