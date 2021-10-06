"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var nanoid_1 = require("nanoid");
var Proposal_routes_1 = __importDefault(require("./Proposal.routes"));
var Proposal_middleware_1 = require("./Proposal.middleware");
var middlewares_1 = require("../../middlewares");
var dependenciesResolver_1 = __importDefault(require("../../dependenciesResolver"));
var proposalController = dependenciesResolver_1.default.get('proposalController');
var proposalRouter = (0, express_1.Router)();
var attachments = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) { return cb(null, './src/resources/attachments/'); },
        filename: function (req, file, cb) { return cb(null, (0, nanoid_1.nanoid)()); }
    })
});
proposalRouter.get(Proposal_routes_1.default.GET_PROPOSALS, middlewares_1.addUserInfo, function (req, res) { return proposalController.getAll(req, res); });
proposalRouter.get(Proposal_routes_1.default.GET_TAGS, function (req, res) { return proposalController.getTags(req, res); });
proposalRouter.get(Proposal_routes_1.default.GET_PROPOSAL, Proposal_middleware_1.validateProposalId, middlewares_1.addUserInfo, function (req, res) { return proposalController.getById(req, res); });
proposalRouter.post(Proposal_routes_1.default.CREATE_PROPOSAL, middlewares_1.validateAuthorization, attachments.array('attachments[]'), Proposal_middleware_1.validateCreateProposal, function (req, res) { return proposalController.create(req, res); });
proposalRouter.post(Proposal_routes_1.default.LIKE_PROPOSAL, middlewares_1.validateAuthorization, function (req, res) { return proposalController.like(req, res); });
proposalRouter.post(Proposal_routes_1.default.DISLIKE_PROPOSAL, middlewares_1.validateAuthorization, function (req, res) { return proposalController.dislike(req, res); });
exports.default = proposalRouter;
