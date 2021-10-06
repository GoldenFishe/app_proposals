"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateComment = void 0;
function validateCreateComment(req, res, next) {
    var commentText = req.body.commentText;
    var proposalId = Number(req.body.proposalId);
    if (Boolean(commentText) &&
        !Number.isNaN(proposalId) &&
        Array.isArray(req.files))
        next();
    else
        res.status(400).send({ message: "commentText, authorId, proposalId are required" });
}
exports.validateCreateComment = validateCreateComment;
