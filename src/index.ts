import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import {UserRepository} from "./User/User.repository";
import {UserController} from "./User/User.controller";
import {ProposalRepository} from "./Proposal/Proposal.repository";
import {ProposalController} from "./Proposal/Proposal.controller";
import {CommentRepository} from "./Comment/Comment.repository";
import {CommentController} from "./Comment/Comment.controller";

const PORT: number = Number(process.env.PORT) || 8080;
const app: Express = express();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

const proposalRepository = new ProposalRepository();
const proposalController = new ProposalController(proposalRepository);

const commentRepository = new CommentRepository();
const commentController = new CommentController(commentRepository);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/api/user/sign-in', (req: Request, res: Response) => userController.signIn(req, res));
app.post('/api/user/sign-up', (req: Request, res: Response) => userController.signUp(req, res));
app.get('/api/user/access-token', (req: Request, res: Response) => userController.getAccessToken(req, res));

app.get('/api/proposals', (req, res, next) => userController.checkAuthorize(req, res, next), (req: Request, res: Response) => proposalController.getAll(req, res));
app.get('/api/proposals/:id', (req: Request, res: Response) => proposalController.getById(req, res));
app.post('/api/proposals', (req: Request, res: Response) => proposalController.create(req, res));

app.post('/api/proposals/:id/comment', (req: Request, res: Response) => commentController.addCommentToProposal(req, res));

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));