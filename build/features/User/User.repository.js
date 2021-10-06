"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
var db_1 = require("../../utils/db");
var User_mapper_1 = require("./User.mapper");
var files_1 = require("../../utils/files");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.create = function (login, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("INSERT INTO users (login, password, username) VALUES ('" + login + "', '" + password + "', '" + login + "') RETURNING *")];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, User_mapper_1.UserMapper.toDTO(user)];
                }
            });
        });
    };
    UserRepository.prototype.getByLoginAndPassword = function (login, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("SELECT * FROM users WHERE login = '" + login + "' AND password = '" + password + "'")];
                    case 1:
                        user = (_a.sent())[0];
                        if (!user)
                            throw new Error("User with login " + login + " doesn't exist");
                        return [2 /*return*/, User_mapper_1.UserMapper.toDTO(user)];
                }
            });
        });
    };
    UserRepository.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("SELECT * FROM users WHERE id = " + id)];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, User_mapper_1.UserMapper.toDTO(user)];
                }
            });
        });
    };
    UserRepository.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("SELECT * FROM users")];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users.map(User_mapper_1.UserMapper.toDTO)];
                }
            });
        });
    };
    UserRepository.prototype.getRefreshSession = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("SELECT * FROM refresh_sessions WHERE refresh_token = '" + refreshToken + "'")];
                    case 1:
                        token = (_a.sent())[0];
                        return [2 /*return*/, token !== null ? User_mapper_1.RefreshSessionMapper.toDTO(token) : null];
                }
            });
        });
    };
    UserRepository.prototype.setRefreshToken = function (userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("INSERT INTO refresh_sessions (user_id, refresh_token, expires_in) VALUES (" + userId + ", '" + refreshToken + "', 123) RETURNING refresh_token")];
                    case 1:
                        token = (_a.sent())[0];
                        return [2 /*return*/, token.refresh_token];
                }
            });
        });
    };
    UserRepository.prototype.getAccessToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("SELECT access_token FROM users WHERE id = (SELECT user_id FROM refresh_sessions WHERE refresh_token = '" + refreshToken + "')")];
                    case 1:
                        token = (_a.sent())[0];
                        return [2 /*return*/, token !== null ? token.access_token : null];
                }
            });
        });
    };
    UserRepository.prototype.setAccessToken = function (userId, accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("UPDATE users SET access_token = '" + accessToken + "' WHERE id = " + userId + " RETURNING access_token")];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user.access_token];
                }
            });
        });
    };
    UserRepository.prototype.updateUser = function (userId, login, password, username, avatarFilename) {
        return __awaiter(this, void 0, void 0, function () {
            var userDTO, queryCommand, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(userId)];
                    case 1:
                        userDTO = _a.sent();
                        if (userDTO.avatar)
                            (0, files_1.deleteAvatarFile)(userDTO.avatar);
                        queryCommand = 'UPDATE users SET';
                        if (login)
                            queryCommand += " login = '" + login + "'";
                        if (password)
                            queryCommand += (login ? ' ,' : '') + " password = '" + password + "'";
                        if (username)
                            queryCommand += ((login || password) ? ' ,' : '') + " username = '" + username + "'";
                        if (avatarFilename)
                            queryCommand += ((login || password || username) ? ' ,' : '') + " avatar_filename = '" + avatarFilename + "'";
                        queryCommand += " WHERE id = " + userId + " RETURNING *";
                        return [4 /*yield*/, (0, db_1.query)(queryCommand)];
                    case 2:
                        user = (_a.sent())[0];
                        return [2 /*return*/, User_mapper_1.UserMapper.toDTO(user)];
                }
            });
        });
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
