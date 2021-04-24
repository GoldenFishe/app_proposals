import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import {ProposalRepository} from "./Proposal/Proposal.repository";
import {ProposalController} from "./Proposal/Proposal.controller";
import {CommentRepository} from "./Comment/Comment.repository";
import {CommentController} from "./Comment/Comment.controller";
import userRouter from "./User/User.router";

const PORT: number = Number(process.env.PORT) || 8080;
const app: Express = express();

const proposalRepository = new ProposalRepository();
const proposalController = new ProposalController(proposalRepository);

const commentRepository = new CommentRepository();
const commentController = new CommentController(commentRepository);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/user', userRouter);

app.get('/api/proposals', (req: Request, res: Response) => proposalController.getAll(req, res));
app.get('/api/proposals/:id', (req: Request, res: Response) => proposalController.getById(req, res));
app.post('/api/proposals', (req: Request, res: Response) => proposalController.create(req, res));

app.post('/api/proposals/:id/comment', (req: Request, res: Response) => commentController.addCommentToProposal(req, res));

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));