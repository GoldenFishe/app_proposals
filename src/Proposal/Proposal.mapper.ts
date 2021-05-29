import {IProposal, IProposalAttachment, IProposalDTO, IProposalPreview, IProposalPreviewDTO} from "./Proposal.types";
import {ICommentDTO} from "../Comment/Comment.types";
import Utils from "../utils";

export class ProposalMapper {
    public static toDTO(proposal: IProposal, comments: ICommentDTO[], attachments: IProposalAttachment[]): IProposalDTO {
        return {
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
            author: {
                id: proposal.author_id,
                username: proposal.author_username,
                avatar: proposal.author_avatar && Utils.getAvatarPath(proposal.author_avatar)
            },
            topic: {
                id: proposal.topic_id,
                topic: proposal.topic
            },
            likes: proposal.likes,
            dislikes: proposal.dislikes,
            isLiked: proposal.is_liked,
            isDisliked: proposal.is_disliked,
            createDate: proposal.create_date,
            comments: comments,
            attachments: attachments.map(attachment => Utils.getAttachmentPath(attachment.filename))
        }
    }

    public static toPreviewDTO(proposal: IProposalPreview): IProposalPreviewDTO {
        return {
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
            author: {
                id: proposal.author_id,
                username: proposal.author_username,
                avatar: proposal.author_avatar && Utils.getAvatarPath(proposal.author_avatar)
            },
            topic: {
                id: proposal.topic_id,
                topic: proposal.topic
            },
            likes: proposal.likes,
            dislikes: proposal.dislikes,
            isLiked: proposal.is_liked,
            isDisliked: proposal.is_disliked,
            createDate: proposal.create_date,
            commentsQuantity: proposal.comments_quantity
        }
    }
}