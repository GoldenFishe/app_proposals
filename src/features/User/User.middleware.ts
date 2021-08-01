import {NextFunction, Request, Response} from "express";

export function validateLoginAndPassword(req: Request, res: Response, next: NextFunction) {
    const {login, password}: { login: string | undefined, password: string | undefined } = req.body;
    if (Boolean(login) && Boolean(password)) next();
    else res.status(400).send({message: 'Login and password are required'});
}

export function validateRefreshToken(req: Request, res: Response, next: NextFunction) {
    const {refresh_token}: { refresh_token: string | undefined } = req.cookies;
    if (Boolean(refresh_token)) next();
    else res.status(401).send({message: 'Unauthorized'});
}