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
exports.CommentRepository = void 0;
var db_1 = require("../../utils/db");
var Comment_mapper_1 = require("./Comment.mapper");
var CommentRepository = /** @class */ (function () {
    function CommentRepository() {
    }
    CommentRepository.prototype.selectCommentsByProposalId = function (proposalId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var comments, commentAttachments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            SELECT c.id,\n                   c.comment,\n                   c.author_id,\n                   u.username                                                \"author_username\",\n                   u.avatar_filename                                         \"author_avatar\",\n                   c.proposal_id,\n                   c.create_date,\n                   COUNT(cl)                                                 \"likes\",\n                   COUNT(cd)                                                 \"dislikes\",\n                   CASE WHEN cl.user_id = " + userId + " THEN TRUE ELSE FALSE END is_liked,\n                   CASE WHEN cd.user_id = " + userId + " THEN TRUE ELSE FALSE END is_disliked,\n                   c.parent_comment_id\n            FROM comments c\n                     JOIN users u ON u.id = c.author_id\n                     LEFT OUTER JOIN comments_likes cl ON c.id = cl.comment_id\n                     LEFT OUTER JOIN comments_dislikes cd ON c.id = cd.comment_id\n            WHERE c.proposal_id = " + proposalId + "\n            GROUP BY c.id,\n                     c.comment,\n                     c.author_id,\n                     u.username,\n                     u.avatar_filename,\n                     c.proposal_id,\n                     c.create_date,\n                     cl.user_id,\n                     cd.user_id,\n                     c.parent_comment_id\n        ")];
                    case 1:
                        comments = _a.sent();
                        return [4 /*yield*/, (0, db_1.query)("\n            SELECT *\n            FROM comment_attachments\n        ")];
                    case 2:
                        commentAttachments = _a.sent();
                        return [2 /*return*/, comments.map(function (comment) {
                                var attachments = commentAttachments.filter(function (attachment) { return attachment.comment_id === comment.id; });
                                return Comment_mapper_1.CommentMapper.toDTO(comment, attachments);
                            })];
                }
            });
        });
    };
    CommentRepository.prototype.insert = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var commentText, authorId, proposalId, parentCommentId, filenames, id, attachmentsPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commentText = data.commentText, authorId = data.authorId, proposalId = data.proposalId, parentCommentId = data.parentCommentId, filenames = data.filenames;
                        return [4 /*yield*/, (0, db_1.query)("\n            INSERT INTO comments (comment, author_id, proposal_id" + (parentCommentId ? ', parent_comment_id' : '') + ")\n            VALUES ('" + commentText + "', " + authorId + ", " + proposalId + (parentCommentId ? ", " + parentCommentId : '') + ")\n            RETURNING id;\n        ")];
                    case 1:
                        id = (_a.sent())[0].id;
                        attachmentsPromise = filenames.map(function (filename) {
                            return (0, db_1.query)("\n                INSERT INTO comment_attachments (comment_id, filename)\n                VALUES (" + id + ", '" + filename + "')\n                RETURNING *\n            ");
                        });
                        return [4 /*yield*/, Promise.all(attachmentsPromise)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.selectCommentsByProposalId(proposalId, authorId)];
                }
            });
        });
    };
    CommentRepository.prototype.toggleLike = function (commentId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            SELECT id\n            FROM comments_likes\n            WHERE comment_id = " + commentId + "\n              AND user_id = " + userId + "\n        ")];
                    case 1:
                        id = (_a.sent())[0];
                        return [2 /*return*/, Boolean(id) ? this.unsetLike(commentId, userId) : this.setLike(commentId, userId)];
                }
            });
        });
    };
    CommentRepository.prototype.toggleDislike = function (commentId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            SELECT id\n            FROM comments_dislikes\n            WHERE comment_id = " + commentId + "\n              AND user_id = " + userId + "\n        ")];
                    case 1:
                        id = (_a.sent())[0];
                        return [2 /*return*/, Boolean(id) ? this.unsetDislike(commentId, userId) : this.setDislike(commentId, userId)];
                }
            });
        });
    };
    CommentRepository.prototype.setLike = function (commentId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var proposal_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            INSERT INTO comments_likes (comment_id, user_id)\n            VALUES (" + commentId + ", " + userId + ")\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.unsetDislike(commentId, userId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, db_1.query)("\n            SELECT proposal_id\n            FROM comments\n            WHERE id = " + commentId + "\n        ")];
                    case 3:
                        proposal_id = (_a.sent())[0].proposal_id;
                        return [2 /*return*/, this.selectCommentsByProposalId(proposal_id, userId)];
                }
            });
        });
    };
    CommentRepository.prototype.unsetLike = function (commentId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var proposal_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            DELETE\n            FROM comments_likes\n            WHERE comment_id = " + commentId + "\n              AND user_id = " + userId + "\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, db_1.query)("\n            SELECT proposal_id\n            FROM comments\n            WHERE id = " + commentId + "\n        ")];
                    case 2:
                        proposal_id = (_a.sent())[0].proposal_id;
                        return [2 /*return*/, this.selectCommentsByProposalId(proposal_id, userId)];
                }
            });
        });
    };
    CommentRepository.prototype.setDislike = function (commentId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var proposal_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            INSERT INTO comments_dislikes (comment_id, user_id)\n            VALUES (" + commentId + ", " + userId + ")\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.unsetLike(commentId, userId)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, db_1.query)("\n            SELECT proposal_id\n            FROM comments\n            WHERE id = " + commentId + "\n        ")];
                    case 3:
                        proposal_id = (_a.sent())[0].proposal_id;
                        return [2 /*return*/, this.selectCommentsByProposalId(proposal_id, userId)];
                }
            });
        });
    };
    CommentRepository.prototype.unsetDislike = function (commentId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var proposal_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, db_1.query)("\n            DELETE\n            FROM comments_dislikes\n            WHERE comment_id = " + commentId + "\n              AND user_id = " + userId + "\n        ")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, db_1.query)("\n            SELECT proposal_id\n            FROM comments\n            WHERE id = " + commentId + "\n        ")];
                    case 2:
                        proposal_id = (_a.sent())[0].proposal_id;
                        return [2 /*return*/, this.selectCommentsByProposalId(proposal_id, userId)];
                }
            });
        });
    };
    return CommentRepository;
}());
exports.CommentRepository = CommentRepository;
