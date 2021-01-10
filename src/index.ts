import express, {Express} from "express";
import bodyParser from "body-parser";

import AuthController from './controllers/Auth.controller';
import ProposalsController from './controllers/Proposals.controller';
import {PORT} from "./config";

const app: Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/api/auth/sign-in', AuthController.signIn);
app.post('/api/auth/sign-up', AuthController.signUp);

app.get('/api/proposals', ProposalsController.getAll);
app.get('/api/proposals/:id', ProposalsController.getById);
app.post('/api/proposals', ProposalsController.create);

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));