
import {IUser} from "../User/User.types";
import {ICommentDTO} from "../Comment/Comments.types";

export interface IProposal {
    id: number;
    title: string;
    description: string;
    author_id: IUser["id"];
    topic_id: number;
    rating: number;
}

export interface IProposalDTO {
    id: IProposal["id"];
    title: IProposal["title"];
    description: IProposal["description"];
    authorId: IProposal["author_id"];
    topicId: IProposal["topic_id"];
    rating: IProposal["rating"];
    comments: ICommentDTO[]
}

