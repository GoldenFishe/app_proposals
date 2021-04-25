import {IProposal, IProposalDTO} from "./Proposal.types";
import {ICommentDTO} from "../Comment/Comment.types";

export class ProposalMapper {
    public static toDTO(proposal: IProposal, comments: ICommentDTO[]): IProposalDTO {
        return {
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
            authorId: proposal.author_id,
            topicId: proposal.topic_id,
            rating: proposal.rating,
            comments: comments
        }
    }
}