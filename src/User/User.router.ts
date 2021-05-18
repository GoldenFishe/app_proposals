import {Request, Response, Router} from "express";
import multer from "multer";

import {UserRepository} from "./User.repository";
import {UserController} from "./User.controller";
import UserRoutes from "./User.routes";
import {validateLoginAndPassword, validateRefreshToken} from "./User.middleware";
import {validateAuthorization} from "../validators";

const userRepository = new UserRepository();
const userController = new UserController(userRepository);
const userRouter = Router();

const avatars = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, './resources/avatars/'),
        filename: (req, file, cb) => cb(null, `avatar_${req.res?.locals.userId}`)
    })
});

userRouter.post(
    UserRoutes.SIGN_IN,
    validateLoginAndPassword,
    (req: Request, res: Response) => userController.signIn(req, res)
);

userRouter.post(
    UserRoutes.SIGN_UP,
    validateLoginAndPassword,
    (req: Request, res: Response) => userController.signUp(req, res)
);

userRouter.get(
    UserRoutes.ACCESS_TOKEN,
    validateRefreshToken,
    (req: Request, res: Response) => userController.getAccessToken(req, res)
);

userRouter.get(
    UserRoutes.INFO,
    (req: Request, res: Response) => userController.getUserInfo(req, res)
);

userRouter.post(
    UserRoutes.UPLOAD_AVATAR,
    validateAuthorization,
    avatars.single('avatar'),
    (req: Request, res: Response) => userController.uploadAvatar(req, res)
)

export default userRouter;