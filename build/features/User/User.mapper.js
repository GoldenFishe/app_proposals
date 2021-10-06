"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshSessionMapper = exports.UserMapper = void 0;
var files_1 = require("../../utils/files");
var UserMapper = /** @class */ (function () {
    function UserMapper() {
    }
    UserMapper.toDTO = function (user) {
        return {
            id: user.id,
            login: user.login,
            username: user.username,
            accessToken: user.access_token,
            avatar: user.avatar_filename && (0, files_1.getAvatarPath)(user.avatar_filename)
        };
    };
    return UserMapper;
}());
exports.UserMapper = UserMapper;
var RefreshSessionMapper = /** @class */ (function () {
    function RefreshSessionMapper() {
    }
    RefreshSessionMapper.toDTO = function (refreshSession) {
        return {
            id: refreshSession.id,
            userId: refreshSession.user_id,
            refreshToken: refreshSession.refresh_token,
            expiresIn: refreshSession.expires_in,
            createdAt: refreshSession.created_at,
        };
    };
    return RefreshSessionMapper;
}());
exports.RefreshSessionMapper = RefreshSessionMapper;
