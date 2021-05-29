import {IProposal} from "../Proposal/Proposal.types";
import {IAuthor, IUser} from "../User/User.types";

export interface IComment {
    id: number;
    comment: string;
    author_id: IUser["id"];
    author_username: IUser["username"];
    author_avatar: IUser["avatar_filename"];
    proposal_id: IProposal["id"];
    create_date: string;
    likes: number;
    dislikes: number;
    is_liked: boolean;
    is_disliked: boolean;
    parent_comment_id: IComment["id"] | null
}

export interface ICommentDTO {
    id: IComment["id"];
    comment: IComment["comment"];
    author: IAuthor;
    createDate: IComment["create_date"],
    likes: IComment["likes"];
    dislikes: IComment["dislikes"];
    isLiked: IComment["is_liked"];
    isDisliked: IComment["is_disliked"];
    attachments: ICommentAttachment["filename"][],
}

export interface ICommentAttachment {
    id: number;
    filename: string;
    comment_id: IComment["id"];
}

export interface INewComment {
    commentText: string;
    authorId: number;
    proposalId: number;
    parentCommentId: number | undefined;
    filenames: string[]
}