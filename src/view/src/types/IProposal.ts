import {IComment} from "./IComment";
import {IAuthor} from "./IUser";

export interface ITopic {
    id: number;
    topic: string;
}

export interface IProposal {
    attachments: [],
    author: IAuthor;
    comments: IComment[]
    createDate: string;
    description: string;
    dislikes: number;
    id: number;
    isDisliked: boolean;
    isLiked: boolean;
    likes: number;
    title: string;
    topic: ITopic;
}

export interface IProposalPreview {
    author: IAuthor;
    commentsQuantity: number;
    createDate: string;
    description: string;
    dislikes: number;
    id: number;
    isDisliked: boolean;
    isLiked: boolean;
    likes: number;
    title: string;
    topic: ITopic;
}