"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var nanoid_1 = require("nanoid");
var User_routes_1 = __importDefault(require("./User.routes"));
var User_middleware_1 = require("./User.middleware");
var middlewares_1 = require("../../middlewares");
var dependenciesResolver_1 = __importDefault(require("../../dependenciesResolver"));
var userController = dependenciesResolver_1.default.get('userController');
var userRouter = (0, express_1.Router)();
var avatars = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) { return cb(null, './src/resources/avatars/'); },
        filename: function (req, file, cb) { return cb(null, (0, nanoid_1.nanoid)()); }
    })
});
userRouter.post(User_routes_1.default.SIGN_IN, User_middleware_1.validateLoginAndPassword, function (req, res) { return userController.signIn(req, res); });
userRouter.post(User_routes_1.default.SIGN_UP, User_middleware_1.validateLoginAndPassword, function (req, res) { return userController.signUp(req, res); });
userRouter.get(User_routes_1.default.ACCESS_TOKEN, User_middleware_1.validateRefreshToken, function (req, res) { return userController.getAccessToken(req, res); });
userRouter.get(User_routes_1.default.INFO, middlewares_1.validateAuthorization, function (req, res) { return userController.getUserInfo(req, res); });
userRouter.get(User_routes_1.default.GET_USER, function (req, res) { return userController.getUserInfoById(req, res); });
userRouter.post(User_routes_1.default.UPDATE_INFO, middlewares_1.validateAuthorization, avatars.single('avatar'), function (req, res) { return userController.setUserInfo(req, res); });
exports.default = userRouter;
