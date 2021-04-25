import {IComment, ICommentDTO} from "./Comment.types";

export class CommentMapper {
    public static toDTO(comment: IComment): ICommentDTO {
        return {
            id: comment.id,
            comment: comment.comment,
            authorId: comment.author_id,
            proposalId: comment.proposal_id,
            rating: comment.rating
        }
    }
}