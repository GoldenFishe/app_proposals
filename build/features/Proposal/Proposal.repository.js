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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalRepository = void 0;
var db_1 = require("../../utils/db");
var Proposal_mapper_1 = require("./Proposal.mapper");
var Comment_mapper_1 = require("../Comment/Comment.mapper");
var ProposalRepository = /** @class */ (function () {
    function ProposalRepository() {
    }
    ProposalRepository.prototype.selectAll = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var tags, proposals, getTagsByProposalId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTags()];
                    case 1:
                        tags = _a.sent();
                        return [4 /*yield*/, (0, db_1.query)("\n            SELECT p.id,\n                   p.title,\n                   p.description,\n                   p.author_id,\n                   u.username                                                \"author_username\",\n                   u.avatar_filename                                         \"author_avatar\",\n                   p.create_date,\n                   COUNT(pl)                                                 \"likes\",\n                   COUNT(pd)                                                 \"dislikes\",\n                   CASE WHEN pl.user_id = " + userId + " THEN TRUE ELSE FALSE END is_liked,\n                   CASE WHEN pd.user_id = " + userId + " THEN TRUE ELSE FALSE END is_disliked,\n                   COUNT(c)                                                  \"comments_quantity\"\n            FROM proposals p\n                     JOIN users u ON u.id = p.author_id\n                     LEFT OUTER JOIN proposals_likes pl ON p.id = pl.proposal_id\n                     LEFT OUTER JOIN proposals_dislikes pd ON p.id = pd.proposal_id\n                     LEFT OUTER JOIN comments c ON p.id = c.proposal_id\n            GROUP BY p.id,\n                     p.title,\n                     p.description,\n                     p.author_id,\n                     u.username,\n                     u.avatar_filename,\n                     p.create_date,\n                     pl.user_id,\n                     pd.user_id\n        ")];
                    case 2:
                        proposals = _a.sent();
                        getTagsByProposalId = function (proposalId) { return tags.filter(function (tag) { return tag.proposalId === proposalId; }); };
                        return [2 /*return*/, proposals.map(function (proposal) { return Proposal_mapper_1.ProposalMapper.toPreviewDTO(proposal, getTagsByProposalId(proposal.id)); })];
                }
            });
        });
    };
    ProposalRepository.prototype.selectById = function (id, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var proposal, proposalAttachments, comments, commentAttachments_1, commentsDTO, tags;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            SELECT p.id,\n                   p.title,\n                   p.description,\n                   p.author_id,\n                   u.username                                                \"author_username\",\n                   u.avatar_filename                                         \"author_avatar\",\n                   p.create_date,\n                   COUNT(pl)                                                 \"likes\",\n                   COUNT(pd)                                                 \"dislikes\",\n                   CASE WHEN pl.user_id = " + userId + " THEN TRUE ELSE FALSE END is_liked,\n                   CASE WHEN pd.user_id = " + userId + " THEN TRUE ELSE FALSE END is_disliked,\n                   COUNT(c)                                                  \"comments_quantity\"\n            FROM proposals p\n                     JOIN users u ON u.id = p.author_id\n                     LEFT OUTER JOIN proposals_likes pl ON p.id = pl.proposal_id\n                     LEFT OUTER JOIN proposals_dislikes pd ON p.id = pd.proposal_id\n                     LEFT OUTER JOIN comments c ON p.id = c.proposal_id\n            WHERE p.id = " + id + "\n            GROUP BY p.id,\n                     p.title,\n                     p.description,\n                     p.author_id,\n                     u.username,\n                     u.avatar_filename,\n                     p.create_date,\n                     pl.user_id,\n                     pd.user_id\n        ")];
                    case 1:
                        proposal = (_a.sent())[0];
                        if (!(proposal !== undefined)) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, db_1.query)("\n            SELECT *\n            FROM proposal_attachments\n            WHERE proposal_id = " + proposal.id + "\n        ")];
                    case 2:
                        proposalAttachments = _a.sent();
                        return [4 /*yield*/, (0, db_1.query)("\n            SELECT c.id,\n                   c.comment,\n                   c.author_id,\n                   u.username                                                \"author_username\",\n                   u.avatar_filename                                         \"author_avatar\",\n                   c.proposal_id,\n                   c.create_date,\n                   COUNT(cl)                                                 \"likes\",\n                   COUNT(cd)                                                 \"dislikes\",\n                   CASE WHEN cl.user_id = " + userId + " THEN TRUE ELSE FALSE END is_liked,\n                   CASE WHEN cd.user_id = " + userId + " THEN TRUE ELSE FALSE END is_disliked,\n                   c.parent_comment_id\n            FROM comments c\n                     JOIN users u ON u.id = c.author_id\n                     LEFT OUTER JOIN comments_likes cl ON c.id = cl.comment_id\n                     LEFT OUTER JOIN comments_dislikes cd ON c.id = cd.comment_id\n            WHERE c.proposal_id = " + id + "\n            GROUP BY c.id,\n                     c.comment,\n                     c.author_id,\n                     u.username,\n                     u.avatar_filename,\n                     c.proposal_id,\n                     c.create_date,\n                     cl.user_id,\n                     cd.user_id,\n                     c.parent_comment_id\n        ")];
                    case 3:
                        comments = _a.sent();
                        return [4 /*yield*/, (0, db_1.query)("\n            SELECT *\n            FROM comment_attachments\n        ")];
                    case 4:
                        commentAttachments_1 = _a.sent();
                        commentsDTO = comments.map(function (comment) {
                            var attachments = commentAttachments_1.filter(function (attachment) { return attachment.comment_id === comment.id; });
                            return Comment_mapper_1.CommentMapper.toDTO(comment, attachments);
                        });
                        return [4 /*yield*/, this.getTags(id)];
                    case 5:
                        tags = _a.sent();
                        return [2 /*return*/, Proposal_mapper_1.ProposalMapper.toDTO(proposal, commentsDTO, proposalAttachments, tags)];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    ProposalRepository.prototype.insert = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var title, description, authorId, tags, filenames, id, attachmentsPromise, tagsPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = data.title, description = data.description, authorId = data.authorId, tags = data.tags, filenames = data.filenames;
                        return [4 /*yield*/, (0, db_1.query)("\n            INSERT INTO proposals (title, description, author_id)\n            VALUES ('" + title + "', '" + description + "', " + authorId + ")\n            RETURNING id;\n        ")];
                    case 1:
                        id = (_a.sent())[0].id;
                        attachmentsPromise = filenames.map(function (filename) {
                            return (0, db_1.query)("\n                INSERT INTO proposal_attachments (proposal_id, filename)\n                VALUES (" + id + ", '" + filename + "')\n                RETURNING *\n            ");
                        });
                        tagsPromise = tags.map(function (tag) {
                            return (0, db_1.query)("\n            INSERT INTO tags (tag, proposal_id)\n            VALUES ('" + tag + "', " + id + ")\n            RETURNING *\n            ");
                        });
                        return [4 /*yield*/, Promise.all(__spreadArray(__spreadArray([], attachmentsPromise, true), tagsPromise, true))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.selectById(id, authorId)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProposalRepository.prototype.toggleLike = function (proposalId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            SELECT id\n            FROM proposals_likes\n            WHERE proposal_id = " + proposalId + "\n              AND user_id = " + userId + "\n        ")];
                    case 1:
                        id = (_a.sent())[0];
                        return [2 /*return*/, Boolean(id) ? this.unsetLike(proposalId, userId) : this.setLike(proposalId, userId)];
                }
            });
        });
    };
    ProposalRepository.prototype.toggleDislike = function (proposalId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            SELECT id\n            FROM proposals_dislikes\n            WHERE proposal_id = " + proposalId + "\n              AND user_id = " + userId + "\n        ")];
                    case 1:
                        id = (_a.sent())[0];
                        return [2 /*return*/, Boolean(id) ? this.unsetDislike(proposalId, userId) : this.setDislike(proposalId, userId)];
                }
            });
        });
    };
    ProposalRepository.prototype.getTags = function (proposalId) {
        return __awaiter(this, void 0, void 0, function () {
            var tags, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!proposalId) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, db_1.query)("SELECT * FROM tags WHERE proposal_id=" + proposalId)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (0, db_1.query)("SELECT * FROM tags")];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        tags = _a;
                        return [2 /*return*/, tags.map(Proposal_mapper_1.TagMapper.toDTO)];
                }
            });
        });
    };
    ProposalRepository.prototype.setLike = function (proposalId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            INSERT INTO proposals_likes (proposal_id, user_id)\n            VALUES (" + proposalId + ", " + userId + ")\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.unsetDislike(proposalId, userId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.selectById(proposalId, userId)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProposalRepository.prototype.setDislike = function (proposalId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            INSERT INTO proposals_dislikes (proposal_id, user_id)\n            VALUES (" + proposalId + ", " + userId + ")\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.unsetLike(proposalId, userId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.selectById(proposalId, userId)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProposalRepository.prototype.unsetLike = function (proposalId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            DELETE\n            FROM proposals_likes\n            WHERE proposal_id = " + proposalId + "\n              AND user_id = " + userId + "\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.selectById(proposalId, userId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProposalRepository.prototype.unsetDislike = function (proposalId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            DELETE\n            FROM proposals_dislikes\n            WHERE proposal_id = " + proposalId + "\n              AND user_id = " + userId + "\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.selectById(proposalId, userId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ProposalRepository;
}());
exports.ProposalRepository = ProposalRepository;
