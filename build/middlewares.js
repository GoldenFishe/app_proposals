"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserInfo = exports.validateAuthorization = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var env_1 = require("./utils/env");
function validateAuthorization(req, res, next) {
    if (req.headers.authorization) {
        try {
            var jwtPayload = jsonwebtoken_1.default.verify(req.headers.authorization, (0, env_1.getDataFromEnvironment)("SECRET_JWT_KEY"));
            res.locals.userId = jwtPayload.userId;
            next();
        }
        catch (err) {
            res.status(401).send({ message: 'Unauthorized' });
        }
    }
    else {
        res.status(401).send({ message: 'Unauthorized' });
    }
}
exports.validateAuthorization = validateAuthorization;
function addUserInfo(req, res, next) {
    if (req.headers.authorization) {
        try {
            var jwtPayload = jsonwebtoken_1.default.verify(req.headers.authorization, (0, env_1.getDataFromEnvironment)("SECRET_JWT_KEY"));
            res.locals.userId = jwtPayload.userId;
        }
        catch (err) {
            res.locals.userId = -1;
        }
        finally {
            next();
        }
    }
    else {
        res.locals.userId = -1;
        next();
    }
}
exports.addUserInfo = addUserInfo;
