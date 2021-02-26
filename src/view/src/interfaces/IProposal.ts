import {IComment} from "./IComment";

interface IProposal {
    id: number;
    title: string;
    description: string;
    authorId: number;
    topicId: number;
    rating: number;
    comments: IComment[]
}

export default IProposal;