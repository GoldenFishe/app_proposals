"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentMapper = void 0;
var files_1 = require("../../utils/files");
var CommentMapper = /** @class */ (function () {
    function CommentMapper() {
    }
    CommentMapper.toDTO = function (comment, attachments) {
        return {
            id: comment.id,
            comment: comment.comment,
            author: {
                id: comment.author_id,
                username: comment.author_username,
                avatar: comment.author_avatar && (0, files_1.getAvatarPath)(comment.author_avatar)
            },
            likes: Number(comment.likes),
            dislikes: Number(comment.dislikes),
            isDisliked: comment.is_disliked,
            isLiked: comment.is_liked,
            createDate: comment.create_date,
            parentCommentId: comment.parent_comment_id,
            attachments: attachments.map(function (attachment) { return (0, files_1.getAttachmentPath)(attachment.filename); })
        };
    };
    return CommentMapper;
}());
exports.CommentMapper = CommentMapper;
