import {IComment, ICommentDTO} from "./Comment.types";
import {IUser} from "../User/User.types";

export class CommentMapper {
    public static toDTO(comment: IComment, user: IUser): ICommentDTO {
        return {
            id: comment.id,
            comment: comment.comment,
            author: {
                id: user.id,
                username: user.username
            },
            likes: comment.likes,
            dislikes: comment.dislikes,
            createDate: comment.create_date
        }
    }
}