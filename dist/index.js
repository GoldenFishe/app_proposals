"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Auth_controller_1 = __importDefault(require("./controllers/Auth.controller"));
const Proposals_controller_1 = __importDefault(require("./controllers/Proposals.controller"));
const config_1 = require("./config");
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.post('/api/auth/sign-in', Auth_controller_1.default.signIn);
app.post('/api/auth/sign-up', Auth_controller_1.default.signUp);
app.get('/api/proposals', Proposals_controller_1.default.getAll);
app.get('/api/proposals/:id', Proposals_controller_1.default.getById);
app.post('/api/proposals', Proposals_controller_1.default.create);
app.listen(config_1.PORT, () => console.log(`Server is listening port ${config_1.PORT}`));
