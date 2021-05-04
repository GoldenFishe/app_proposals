import {IComment} from "./IComment";

export interface IProposal {
    id: number;
    title: string;
    description: string;
    authorId: number;
    topicId: number;
    rating: number;
    comments: IComment[]
}