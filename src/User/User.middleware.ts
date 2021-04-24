import {NextFunction, Request, Response} from "express";
import userRoutes from "./User.routes";

export default function userMiddleware(req: Request, res: Response, next: NextFunction) {
    switch (req.path) {
        case userRoutes.SIGN_IN:
        case userRoutes.SIGN_UP: {
            if (validateLoginAndPassword(req)) next();
            else res.status(400).send({message: 'Login and password are required'});
            break;
        }
        case userRoutes.ACCESS_TOKEN:
            if (validateRefreshToken(req)) next();
            else res.status(401).send({message: 'Unauthorized'});
            break;
        default:
            next();
            break;
    }
}

function validateLoginAndPassword(req: Request): boolean {
    const {login, password}: { login: string | undefined, password: string | undefined } = req.body;
    return Boolean(login) && Boolean(password);
}

function validateRefreshToken(req: Request): boolean {
    const {refresh_token}: { refresh_token: string } = req.cookies;
    return Boolean(refresh_token);
}