import express, {Express} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userRouter from "./User/User.router";
import proposalRouter from "./Proposal/Proposal.router";
import commentRouter from "./Comment/Comment.router";

const PORT: number = Number(process.env.PORT) || 8080;
const app: Express = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/api/proposals', proposalRouter);
app.use('/api/comments', commentRouter);

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));