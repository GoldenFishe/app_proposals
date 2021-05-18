import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userRouter from "./User/User.router";
import proposalRouter from "./Proposal/Proposal.router";
import commentRouter from "./Comment/Comment.router";
import Utils from "./utils";

const PORT: number = Number(process.env['APP_PORT']) || 8080;
const app: Express = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/api/proposals', proposalRouter);
app.use('/api/comments', commentRouter);

app.get('/resources/avatar/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isNaN(id)) {
        const avatar = Utils.getAvatar(id);
        avatar ? res.sendFile(avatar) : res.sendStatus(404);
    } else {
        res.sendStatus(404);
    }
})

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));