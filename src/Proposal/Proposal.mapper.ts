import {IProposalDTO} from "./Proposal.dto";
import {IProposal} from "./Proposal.repository";
import {ICommentDTO} from "../Comment/Comment.dto";

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