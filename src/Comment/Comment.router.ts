import {Request, Response, Router} from "express";

import {CommentRepository} from "./Comment.repository";
import {CommentController} from "./Comment.controller";
import CommentRoutes from "./Comment.routes";
import {validateCreateComment} from "./Comment.middleware";

const commentRepository = new CommentRepository();
const commentController = new CommentController(commentRepository);
const commentRouter = Router();

commentRouter.use(CommentRoutes.CREATE_COMMENT, validateCreateComment);

commentRouter.post(CommentRoutes.CREATE_COMMENT, (req: Request, res: Response) => commentController.addCommentToProposal(req, res));

export default commentRouter;