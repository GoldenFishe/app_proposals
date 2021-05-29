import {IAuthor} from "./IUser";

export interface IComment {
    attachments: [];
    author: IAuthor;
    comment: string;
    createDate: string;
    dislikes: number;
    id: number;
    isDisliked: boolean;
    isLiked: boolean;
    likes: number;
}