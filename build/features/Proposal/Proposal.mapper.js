"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagMapper = exports.ProposalMapper = void 0;
var files_1 = require("../../utils/files");
var ProposalMapper = /** @class */ (function () {
    function ProposalMapper() {
    }
    ProposalMapper.toDTO = function (proposal, comments, attachments, tags) {
        return {
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
            author: {
                id: proposal.author_id,
                username: proposal.author_username,
                avatar: proposal.author_avatar && (0, files_1.getAvatarPath)(proposal.author_avatar)
            },
            tags: tags,
            likes: Number(proposal.likes),
            dislikes: Number(proposal.dislikes),
            isLiked: proposal.is_liked,
            isDisliked: proposal.is_disliked,
            createDate: proposal.create_date,
            comments: comments,
            attachments: attachments.map(function (attachment) { return (0, files_1.getAttachmentPath)(attachment.filename); })
        };
    };
    ProposalMapper.toPreviewDTO = function (proposal, tags) {
        return {
            id: proposal.id,
            title: proposal.title,
            description: proposal.description,
            author: {
                id: proposal.author_id,
                username: proposal.author_username,
                avatar: proposal.author_avatar && (0, files_1.getAvatarPath)(proposal.author_avatar)
            },
            tags: tags,
            likes: Number(proposal.likes),
            dislikes: Number(proposal.dislikes),
            isLiked: proposal.is_liked,
            isDisliked: proposal.is_disliked,
            createDate: proposal.create_date,
            commentsQuantity: Number(proposal.comments_quantity)
        };
    };
    return ProposalMapper;
}());
exports.ProposalMapper = ProposalMapper;
var TagMapper = /** @class */ (function () {
    function TagMapper() {
    }
    TagMapper.toDTO = function (tag) {
        return {
            tag: tag.tag,
            proposalId: tag.proposal_id
        };
    };
    return TagMapper;
}());
exports.TagMapper = TagMapper;
