import {Request, Response, Router} from "express";
import multer from "multer";
import {nanoid} from "nanoid";

import {IUserController} from "./User.controller";
import UserRoutes from "./User.routes";
import {validateLoginAndPassword, validateRefreshToken} from "./User.middleware";
import {validateAuthorization} from "../validators";
import dependenciesResolver from "../dependenciesResolver";

const userController = dependenciesResolver.get('userController') as IUserController;
const userRouter = Router();

const avatars = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, './src/resources/avatars/'),
        filename: (req, file, cb) => cb(null, nanoid())
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
    validateAuthorization,
    (req: Request, res: Response) => userController.getUserInfo(req, res)
);

userRouter.post(
    UserRoutes.UPDATE_INFO,
    validateAuthorization,
    avatars.single('avatar'),
    (req: Request, res: Response) => userController.setUserInfo(req, res)
)

export default userRouter;