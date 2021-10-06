"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateProposal = exports.validateProposalId = void 0;
function validateProposalId(req, res, next) {
    var id = Number(req.params.id);
    if (!Number.isNaN(id))
        next();
    else
        res.status(400).send({ message: "Proposal id must be a number" });
}
exports.validateProposalId = validateProposalId;
function validateCreateProposal(req, res, next) {
    var _a = req.body, title = _a.title, description = _a.description, tags = _a.tags;
    if (Boolean(title) && Boolean(description) && Boolean(tags) && Array.isArray(JSON.parse(tags)) && Array.isArray(req.files))
        next();
    else
        res.status(400).send({ message: "Title and description are required" });
}
exports.validateCreateProposal = validateCreateProposal;
