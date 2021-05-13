import {IProposal, IProposalDTO, ITopic} from "./Proposal.types";
import {ICommentDTO} from "../Comment/Comment.types";
import {IUser} from "../User/User.types";

export class ProposalMapper {
    public static toDTO(proposal: IProposal, comments: ICommentDTO[], user: IUser, topic: ITopic): IProposalDTO {
        return {
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
            author: {
                id: user.id,
                username: user.username
            },
            topic: {
                id: topic.id,
                topic: topic.topic
            },
            likes: proposal.likes,
            dislikes: proposal.dislikes,
            createDate: proposal.create_date,
            comments: comments
        }
    }
}