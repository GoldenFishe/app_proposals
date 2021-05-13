import {IAuthor} from "./IUser";

export interface IComment {
    id: number;
    comment: string;
    author: IAuthor;
    likes: number;
    dislikes: number;
    createDate: string;
}