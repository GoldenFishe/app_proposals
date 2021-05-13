import {IProposal} from "../Proposal/Proposal.types";
import {IAuthor, IUser} from "../User/User.types";

export interface IComment {
    id: number;
    comment: string;
    author_id: IUser["id"];
    proposal_id: IProposal["id"];
    likes: number;
    dislikes: number;
    create_date: Date
}

export interface ICommentDTO {
    id: IComment["id"];
    comment: IComment["comment"];
    author: IAuthor;
    likes: IComment["likes"];
    dislikes: IComment["dislikes"];
    createDate: IComment["create_date"]
}