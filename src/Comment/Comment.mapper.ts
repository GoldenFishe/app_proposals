import {IComment, ICommentAttachment, ICommentDTO} from "./Comment.types";
import {IUser} from "../User/User.types";
import Utils from "../utils";

export class CommentMapper {
    public static toDTO(comment: IComment, user: IUser, attachments: ICommentAttachment[]): ICommentDTO {
        return {
            id: comment.id,
            comment: comment.comment,
            author: {
                id: user.id,
                username: user.username,
                avatar: user.avatar_filename && Utils.getAvatarPath(user.avatar_filename)
            },
            likes: comment.likes,
            dislikes: comment.dislikes,
            createDate: comment.create_date,
            attachments: attachments.map(attachment => Utils.getAttachmentPath(attachment.filename))
        }
    }
}