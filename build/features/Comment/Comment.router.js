"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var nanoid_1 = require("nanoid");
var Comment_routes_1 = __importDefault(require("./Comment.routes"));
var Comment_middleware_1 = require("./Comment.middleware");
var middlewares_1 = require("../../middlewares");
var dependenciesResolver_1 = __importDefault(require("../../dependenciesResolver"));
var commentController = dependenciesResolver_1.default.get('commentController');
var commentRouter = (0, express_1.Router)();
var attachments = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) { return cb(null, './src/resources/attachments/'); },
        filename: function (req, file, cb) { return cb(null, (0, nanoid_1.nanoid)()); }
    })
});
commentRouter.post(Comment_routes_1.default.CREATE_COMMENT, middlewares_1.validateAuthorization, attachments.array('attachments[]'), Comment_middleware_1.validateCreateComment, function (req, res) { return commentController.create(req, res); });
commentRouter.post(Comment_routes_1.default.LIKE_COMMENT, middlewares_1.validateAuthorization, function (req, res) { return commentController.like(req, res); });
commentRouter.post(Comment_routes_1.default.DISLIKE_COMMENT, middlewares_1.validateAuthorization, function (req, res) { return commentController.dislike(req, res); });
exports.default = commentRouter;
