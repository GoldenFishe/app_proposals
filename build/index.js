"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var User_router_1 = __importDefault(require("./features/User/User.router"));
var Proposal_router_1 = __importDefault(require("./features/Proposal/Proposal.router"));
var Comment_router_1 = __importDefault(require("./features/Comment/Comment.router"));
var files_1 = require("./utils/files");
var env_1 = require("./utils/env");
var PORT = Number((0, env_1.getDataFromEnvironment)("APP_PORT", false)) || 8080;
var app = (0, express_1.default)();
(0, files_1.createResourcesFolder)();
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/api/user', User_router_1.default);
app.use('/api/proposals', Proposal_router_1.default);
app.use('/api/comments', Comment_router_1.default);
app.get('/resources/avatars/:filename', function (req, res) {
    var filename = req.params.filename;
    if (filename) {
        var file = (0, files_1.getAvatarFile)(filename);
        file ? res.sendFile(file) : res.sendStatus(404);
    }
    else {
        res.sendStatus(404);
    }
});
app.get('/resources/attachments/:filename', function (req, res) {
    var filename = req.params.filename;
    if (filename) {
        var file = (0, files_1.getAttachmentFile)(filename);
        file ? res.sendFile(file) : res.sendStatus(404);
    }
    else {
        res.sendStatus(404);
    }
});
app.listen(PORT, function () { return console.log("Server is listening port " + PORT); });
