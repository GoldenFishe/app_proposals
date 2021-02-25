import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";

import AuthController from './Auth';
import {ProposalController} from './Proposal/Proposal.controller';
import {ProposalRepository} from "./Proposal/Proposal.repository";
import {CommentRepository} from "./Comment/Comment.repository";
import {CommentController} from "./Comment/Comment.controller";
import {PORT} from "./config";

const app: Express = express();

const proposalRepository = new ProposalRepository();
const proposalController = new ProposalController(proposalRepository);

const commentRepository = new CommentRepository();
const commentController = new CommentController(commentRepository);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/api/auth/sign-in', AuthController.signIn);
app.post('/api/auth/sign-up', AuthController.signUp);

app.get('/api/proposals', (req: Request, res: Response) => proposalController.getAll(req, res));
app.get('/api/proposals/:id', (req: Request, res: Response) => proposalController.getById(req, res));
app.post('/api/proposals', (req: Request, res: Response) => proposalController.create(req, res));

app.post('/api/proposals/:id/comment', (req: Request, res: Response) => commentController.addCommentToProposal(req, res));

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));