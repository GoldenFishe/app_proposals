import {Request, Response, Router} from "express";
import multer from "multer";

import {UserRepository} from "./User.repository";
import {UserController} from "./User.controller";
import UserRoutes from "./User.routes";
import userMiddleware from "./User.middleware";
import path from "path";

const userRepository = new UserRepository();
const userController = new UserController(userRepository);
const userRouter = Router();
const avatars = multer({dest: './src/resources/avatars/'})

userRouter.use(userMiddleware);

userRouter.post(
    UserRoutes.SIGN_IN,
    (req: Request, res: Response) => userController.signIn(req, res)
);

userRouter.post(
    UserRoutes.SIGN_UP,
    (req: Request, res: Response) => userController.signUp(req, res)
);

userRouter.get(
    UserRoutes.ACCESS_TOKEN,
    (req: Request, res: Response) => userController.getAccessToken(req, res)
);

userRouter.get(
    UserRoutes.INFO,
    (req: Request, res: Response) => userController.getUserInfo(req, res)
);

userRouter.post(
    UserRoutes.UPLOAD_AVATAR,
    avatars.single('avatar'),
    (req: Request, res: Response) => userController.getUserInfo(req, res)
)

userRouter.get(
    UserRoutes.GET_AVATAR,
    (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '..', '/resources/avatars/test'))
    }
)

export default userRouter;