"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var env_1 = require("../../utils/env");
var UserController = /** @class */ (function () {
    function UserController(userRepository) {
        this.userRepository = userRepository;
    }
    UserController.prototype.signIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, login, password, user, _b, refreshToken, accessToken, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, login = _a.login, password = _a.password;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.userRepository.getByLoginAndPassword(login, password)];
                    case 2:
                        user = _c.sent();
                        return [4 /*yield*/, this.generateTokens(user.id)];
                    case 3:
                        _b = _c.sent(), refreshToken = _b.refreshToken, accessToken = _b.accessToken;
                        res.cookie('refresh_token', refreshToken, this.refreshTokenCookieOptions).send(__assign(__assign({}, user), { accessToken: accessToken }));
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _c.sent();
                        res.status(400).send({ message: "User with login " + login + " doesn't exist" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.signUp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, login, password, user, _b, refreshToken, accessToken;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, login = _a.login, password = _a.password;
                        return [4 /*yield*/, this.userRepository.create(login, password)];
                    case 1:
                        user = _c.sent();
                        return [4 /*yield*/, this.generateTokens(user.id)];
                    case 2:
                        _b = _c.sent(), refreshToken = _b.refreshToken, accessToken = _b.accessToken;
                        res.cookie('refresh_token', refreshToken, this.refreshTokenCookieOptions).send(__assign(__assign({}, user), { accessToken: accessToken }));
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getAccessToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var refresh_token, refreshSession, _a, refreshToken, accessToken, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        refresh_token = req.cookies.refresh_token;
                        return [4 /*yield*/, this.userRepository.getRefreshSession(refresh_token)];
                    case 1:
                        refreshSession = _b.sent();
                        if (!refreshSession) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.generateTokens(refreshSession.userId)];
                    case 2:
                        _a = _b.sent(), refreshToken = _a.refreshToken, accessToken = _a.accessToken;
                        res.cookie('refresh_token', refreshToken, this.refreshTokenCookieOptions).send({ accessToken: accessToken });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(401).send({ message: 'Unauthorized' });
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _b.sent();
                        res.status(401).send({ message: 'Unauthorized' });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUserInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = res.locals.userId;
                        return [4 /*yield*/, this.userRepository.getById(userId)];
                    case 1:
                        user = _a.sent();
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUserInfoById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Number(req.params.id);
                        return [4 /*yield*/, this.userRepository.getById(id)];
                    case 1:
                        user = _a.sent();
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.setUserInfo = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, login, password, username, userId, filename, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = req.body, login = _b.login, password = _b.password, username = _b.username;
                        userId = res.locals.userId;
                        filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                        return [4 /*yield*/, this.userRepository.updateUser(userId, login, password, username, filename)];
                    case 1:
                        user = _c.sent();
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.generateTokens = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var jwtPayload, generatedAccessToken, refreshTokenPromise, accessTokenPromise, _a, refreshToken, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jwtPayload = { userId: userId };
                        generatedAccessToken = jsonwebtoken_1.default.sign(jwtPayload, (0, env_1.getDataFromEnvironment)("SECRET_JWT_KEY"), { expiresIn: Number((0, env_1.getDataFromEnvironment)("JWT_EXP")) });
                        refreshTokenPromise = this.userRepository.setRefreshToken(userId, Date.now().toString());
                        accessTokenPromise = this.userRepository.setAccessToken(userId, generatedAccessToken);
                        return [4 /*yield*/, Promise.all([refreshTokenPromise, accessTokenPromise])];
                    case 1:
                        _a = _b.sent(), refreshToken = _a[0], accessToken = _a[1];
                        return [2 /*return*/, { refreshToken: refreshToken, accessToken: accessToken }];
                }
            });
        });
    };
    Object.defineProperty(UserController.prototype, "refreshTokenCookieOptions", {
        get: function () {
            return { httpOnly: true, maxAge: Number((0, env_1.getDataFromEnvironment)("JWT_EXP")) * 2 };
        },
        enumerable: false,
        configurable: true
    });
    return UserController;
}());
exports.UserController = UserController;
