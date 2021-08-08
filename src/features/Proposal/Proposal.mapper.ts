import {
    IProposal,
    IProposalAttachment,
    IProposalDTO,
    IProposalPreview,
    IProposalPreviewDTO,
    ITag, ITagDTO
} from "./Proposal.types";
import {ICommentDTO} from "../Comment/Comment.types";
import {getAttachmentPath, getAvatarPath} from "../../utils/files";

export class ProposalMapper {
    public static toDTO(proposal: IProposal, comments: ICommentDTO[], attachments: IProposalAttachment[], tags: ITagDTO[]): IProposalDTO {
        return {
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
            author: {
                id: proposal.author_id,
                username: proposal.author_username,
                avatar: proposal.author_avatar && getAvatarPath(proposal.author_avatar)
            },
            tags: tags.filter(tag => proposal.tags_ids.includes(tag.id)),
            likes: Number(proposal.likes),
            dislikes: Number(proposal.dislikes),
            isLiked: proposal.is_liked,
            isDisliked: proposal.is_disliked,
            createDate: proposal.create_date,
            comments: comments,
            attachments: attachments.map(attachment => getAttachmentPath(attachment.filename))
        }
    }

    public static toPreviewDTO(proposal: IProposalPreview, tags: ITagDTO[]): IProposalPreviewDTO {
        return {
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
            author: {
                id: proposal.author_id,
                username: proposal.author_username,
                avatar: proposal.author_avatar && getAvatarPath(proposal.author_avatar)
            },
            tags: tags.filter(tag => proposal.tags_ids.includes(tag.id)),
            likes: Number(proposal.likes),
            dislikes: Number(proposal.dislikes),
            isLiked: proposal.is_liked,
            isDisliked: proposal.is_disliked,
            createDate: proposal.create_date,
            commentsQuantity: Number(proposal.comments_quantity)
        }
    }
}

export class TagMapper {
    public static toDTO(tag: ITag): ITagDTO {
        return {
            id: tag.id,
            tag: tag.tag,
            color: tag.color
        }
    }
}