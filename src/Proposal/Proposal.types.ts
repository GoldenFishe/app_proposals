import {IAuthor, IUser} from "../User/User.types";
import {IComment, ICommentDTO} from "../Comment/Comment.types";

export interface ITopic {
    id: number;
    topic: string;
}

export interface IProposal {
    id: number;
    title: string;
    description: string;
    author_id: IUser["id"];
    author_username: IUser["username"];
    author_avatar: IUser["avatar_filename"];
    topic_id: ITopic["id"];
    topic: ITopic["topic"];
    create_date: string;
    likes: number;
    dislikes: number;
    is_liked: boolean;
    is_disliked: boolean;
}

export interface IProposalPreview extends IProposal {
    comments_quantity: IComment[]["length"];
}

export interface IProposalDTO {
    id: IProposal["id"];
    title: IProposal["title"];
    description: IProposal["description"];
    author: IAuthor;
    topic: ITopic;
    likes: IProposal["likes"];
    dislikes: IProposal["likes"];
    isLiked: IProposal["is_liked"];
    isDisliked: IProposal["is_disliked"];
    createDate: IProposal["create_date"];
    comments: ICommentDTO[],
    attachments: IProposalAttachment["filename"][]
}

export type IProposalPreviewDTO =
    Omit<IProposalDTO, "comments" | "attachments"> &
    { commentsQuantity: IProposalPreview["comments_quantity"] };

export interface IProposalAttachment {
    id: number;
    filename: string;
    proposal_id: IProposal["id"];
}

export interface INewProposal {
    title: string;
    description: string;
    authorId: number;
    topicId: number;
    filenames: string[]
}
