import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";

import AuthController from './Auth';
import {ProposalController} from './Proposal/Proposal.controller';
import {ProposalRepository} from "./Proposal/Proposal.repository";
import {PORT} from "./config";

const app: Express = express();

const proposalRepository = new ProposalRepository();
const proposalController = new ProposalController(proposalRepository);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/api/auth/sign-in', AuthController.signIn);
app.post('/api/auth/sign-up', AuthController.signUp);

app.get('/api/proposals', (req: Request, res: Response) => proposalController.getAll(req, res));
app.get('/api/proposals/:id', (req: Request, res: Response) => proposalController.getById(req, res));
app.post('/api/proposals', (req: Request, res: Response) => proposalController.create(req, res));

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));