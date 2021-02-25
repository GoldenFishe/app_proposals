import {ICommentDTO} from "../Comment/Comment.dto";

export interface IProposalDTO {
    id: number;
    title: string;
    description: string;
    authorId: number;
    rating: number;
    comments: ICommentDTO[]
}