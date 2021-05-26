import {Request, Response, Router} from "express";
import multer from "multer";

import {IUserController} from "./User.controller";
import UserRoutes from "./User.routes";
import {validateLoginAndPassword, validateRefreshToken, validateUserInfo} from "./User.middleware";
import {validateAuthorization} from "../validators";
import DIContainer from "../DIContainer";

const userController = DIContainer.get('userController') as IUserController;
const userRouter = Router();

const avatars = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, './src/resources/avatars/'),
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
    validateAuthorization,
    (req: Request, res: Response) => userController.getUserInfo(req, res)
);

userRouter.post(
    UserRoutes.UPDATE_INFO,
    validateAuthorization,
    validateUserInfo,
    avatars.single('avatar'),
    (req: Request, res: Response) => userController.getUserInfo(req, res)
)

export default userRouter;