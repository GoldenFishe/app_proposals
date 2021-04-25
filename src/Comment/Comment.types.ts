import {IProposal} from "../Proposal/Proposal.types";
import {IUser} from "../User/User.types";

export interface IComment {
    id: number;
    comment: string;
    author_id: IUser["id"];
    proposal_id: IProposal["id"];
    rating: number;
}

export interface ICommentDTO {
    id: IComment["id"];
    comment: IComment["comment"];
    authorId: IComment["author_id"];
    proposalId: IComment["proposal_id"];
    rating: number;
}