import {IProposal, IProposalAttachment, IProposalDTO, ITopic} from "./Proposal.types";
import {ICommentDTO} from "../Comment/Comment.types";
import {IUser} from "../User/User.types";
import Utils from "../utils";

export class ProposalMapper {
    public static toDTO(proposal: IProposal, comments: ICommentDTO[], user: IUser, topic: ITopic, attachments: IProposalAttachment[]): IProposalDTO {
        return {
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
            author: {
                id: user.id,
                username: user.username,
                avatar: user.avatar_filename && Utils.getAvatarPath(user.avatar_filename)
            },
            topic: {
                id: topic.id,
                topic: topic.topic
            },
            likes: proposal.likes,
            dislikes: proposal.dislikes,
            createDate: proposal.create_date,
            comments: comments,
            attachments: attachments.map(attachment => Utils.getAttachmentPath(attachment.filename))
        }
    }
}