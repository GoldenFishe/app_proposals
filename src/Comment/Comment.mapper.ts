import {IComment, ICommentAttachment, ICommentDTO} from "./Comment.types";
import {IUser} from "../User/User.types";
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
            likes: comment.likes,
            dislikes: comment.dislikes,
            isDisliked: comment.is_disliked,
            isLiked: comment.is_liked,
            createDate: comment.create_date,
            attachments: attachments.map(attachment => Utils.getAttachmentPath(attachment.filename))
        }
    }
}