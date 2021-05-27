import {IAuthor, IUser} from "../User/User.types";
import {ICommentDTO} from "../Comment/Comment.types";

export interface ITopic {
    id: number;
    topic: string;
}

export interface IProposal {
    id: number;
    title: string;
    description: string;
    author_id: IUser["id"];
    topic_id: ITopic["id"];
    likes: number;
    dislikes: number;
    create_date: Date
}

export interface IProposalDTO {
    id: IProposal["id"];
    title: IProposal["title"];
    description: IProposal["description"];
    author: IAuthor;
    topic: ITopic;
    likes: IProposal["likes"];
    dislikes: IProposal["dislikes"];
    createDate: IProposal["create_date"];
    comments: ICommentDTO[],
    attachments: IProposalAttachments["filename"][],
}

export interface IProposalAttachments {
    id: number;
    filename: string;
    proposal_id: IProposal["id"];
}

