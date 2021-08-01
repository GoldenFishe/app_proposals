import {Request, Response, Router} from "express";
import multer from "multer";
import {nanoid} from "nanoid";

import {ICommentController} from "./Comment.controller";
import CommentRoutes from "./Comment.routes";
import {validateCreateComment} from "./Comment.middleware";
import {validateAuthorization} from "../../middlewares";
import dependenciesResolver from "../../dependenciesResolver";

const commentController = dependenciesResolver.get('commentController') as ICommentController;
const commentRouter = Router();

const attachments = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, './src/resources/attachments/'),
        filename: (req, file, cb) => cb(null, nanoid())
    })
});

commentRouter.post(
    CommentRoutes.CREATE_COMMENT,
    validateAuthorization,
    attachments.array('attachments[]'),
    validateCreateComment,
    (req: Request, res: Response) => commentController.create(req, res)
);

commentRouter.post(
    CommentRoutes.LIKE_COMMENT,
    validateAuthorization,
    (req: Request, res: Response) => commentController.like(req, res)
);

commentRouter.post(
    CommentRoutes.DISLIKE_COMMENT,
    validateAuthorization,
    (req: Request, res: Response) => commentController.dislike(req, res)
);

export default commentRouter;