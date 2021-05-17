import {Request, Response, Router} from "express";

import {CommentRepository} from "./Comment.repository";
import {CommentController} from "./Comment.controller";
import CommentRoutes from "./Comment.routes";
import {validateCreateComment} from "./Comment.middleware";
import {validateAuthorization} from "../validators";

const commentRepository = new CommentRepository();
const commentController = new CommentController(commentRepository);
const commentRouter = Router();

commentRouter.post(
    CommentRoutes.CREATE_COMMENT,
    validateAuthorization,
    validateCreateComment,
    (req: Request, res: Response) => commentController.addCommentToProposal(req, res)
);

commentRouter.post(
    CommentRoutes.LIKE_COMMENT,
    validateAuthorization,
    (req: Request, res: Response) => commentController.likeComment(req, res)
);

commentRouter.post(
    CommentRoutes.DISLIKE_COMMENT,
    validateAuthorization,
    (req: Request, res: Response) => commentController.dislikeComment(req, res)
);

export default commentRouter;