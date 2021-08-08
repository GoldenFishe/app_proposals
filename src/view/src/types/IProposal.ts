import {IComment} from "./IComment";
import {IAuthor} from "./IUser";

export interface ITag {
    id: number;
    tag: string;
    color: string;
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
    tags: Array<ITag>;
}

export type IProposalPreview = Omit<IProposal, "comments" | "attachments"> & { commentsQuantity: number };