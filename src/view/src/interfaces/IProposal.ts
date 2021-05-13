import {IComment} from "./IComment";
import {IAuthor} from "./IUser";

export interface ITopic {
    id: number;
    topic: string;
}

export interface IProposal {
    id: number;
    title: string;
    description: string;
    author: IAuthor;
    topic: ITopic;
    likes: number;
    dislikes: number;
    createDate: string;
    comments: IComment[]
}