"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_repository_1 = require("./features/User/User.repository");
var Proposal_repository_1 = require("./features/Proposal/Proposal.repository");
var Comment_repository_1 = require("./features/Comment/Comment.repository");
var User_controller_1 = require("./features/User/User.controller");
var Proposal_controller_1 = require("./features/Proposal/Proposal.controller");
var Comment_controller_1 = require("./features/Comment/Comment.controller");
var userRepository = new User_repository_1.UserRepository();
var proposalRepository = new Proposal_repository_1.ProposalRepository();
var commentRepository = new Comment_repository_1.CommentRepository();
var userController = new User_controller_1.UserController(userRepository);
var proposalController = new Proposal_controller_1.ProposalController(proposalRepository);
var commentController = new Comment_controller_1.CommentController(commentRepository);
exports.default = new Map([
    ['userRepository', userRepository],
    ['proposalRepository', proposalRepository],
    ['commentRepository', commentRepository],
    ['userController', userController],
    ['proposalController', proposalController],
    ['commentController', commentController]
]);
