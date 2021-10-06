import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import userRouter from "./features/User/User.router";
import proposalRouter from "./features/Proposal/Proposal.router";
import commentRouter from "./features/Comment/Comment.router";
import {createResourcesFolder, getAttachmentFile, getAvatarFile} from "./utils/files";
import {getDataFromEnvironment} from "./utils/env";

const PORT: number = Number(getDataFromEnvironment("PORT", false)) || 8080;
const app: Express = express();

createResourcesFolder();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/view/build`));

app.use('/api/user', userRouter);
app.use('/api/proposals', proposalRouter);
app.use('/api/comments', commentRouter);

app.get('/resources/avatars/:filename', (req: Request, res: Response) => {
    const {filename} = req.params;
    if (filename) {
        const file = getAvatarFile(filename);
        file ? res.sendFile(file) : res.sendStatus(404);
    } else {
        res.sendStatus(404);
    }
})

app.get('/resources/attachments/:filename', (req: Request, res: Response) => {
    const {filename} = req.params;
    if (filename) {
        const file = getAttachmentFile(filename);
        file ? res.sendFile(file) : res.sendStatus(404);
    } else {
        res.sendStatus(404);
    }
})

app.get('*', (req: Request, res: Response) => {
    res.sendFile(`${__dirname}/view/build/index.html`)
})

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));