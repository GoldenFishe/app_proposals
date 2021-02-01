import express, {Express} from "express";
import bodyParser from "body-parser";

import AuthController from './Auth';
import {ProposalController} from './Proposal/Proposal.controller';
import {ProposalService} from "./Proposal/Proposal.service";
import {ProposalRepository} from "./Proposal/Proposal.repository";
import {PORT} from "./config";

const app: Express = express();

const proposalRepository = new ProposalRepository();
const proposalsService = new ProposalService(proposalRepository);
const proposalController = new ProposalController(proposalsService);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/api/auth/sign-in', AuthController.signIn);
app.post('/api/auth/sign-up', AuthController.signUp);

app.get('/api/proposals', proposalController.getAll.bind(proposalController));
app.get('/api/proposals/:id', proposalController.getById.bind(proposalController));
app.post('/api/proposals', proposalController.create.bind(proposalController));

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));