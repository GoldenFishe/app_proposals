import {IProposalDTO} from "./Proposal.dto";
import {IProposal} from "./Proposal.repository";

export class ProposalMapper {
    public static toDTO(proposal: IProposal): IProposalDTO {
        return {
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
            authorId: proposal.author_id,
            rating: proposal.rating
        }
    }
}