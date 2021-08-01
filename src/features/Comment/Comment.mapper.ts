import {IComment, ICommentAttachment, ICommentDTO} from "./Comment.types";
import {getAttachmentPath, getAvatarPath} from "../../utils/files";

export class CommentMapper {
    public static toDTO(comment: IComment, attachments: ICommentAttachment[]): ICommentDTO {
        return {
            id: comment.id,
            comment: comment.comment,
            author: {
                id: comment.author_id,
                username: comment.author_username,
                avatar: comment.author_avatar && getAvatarPath(comment.author_avatar)
            },
            likes: Number(comment.likes),
            dislikes: Number(comment.dislikes),
            isDisliked: comment.is_disliked,
            isLiked: comment.is_liked,
            createDate: comment.create_date,
            parentCommentId: comment.parent_comment_id,
            attachments: attachments.map(attachment => getAttachmentPath(attachment.filename))
        }
    }
}