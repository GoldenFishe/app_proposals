import {NextFunction, Request, Response} from "express";
import jwt, {Secret} from "jsonwebtoken";

import {JWTPayload} from "./features/User/User.types";

export function validateAuthorization(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        try {
            const jwtPayload = jwt.verify(req.headers.authorization, process.env["SECRET_JWT_KEY"] as Secret) as JWTPayload;
            res.locals.userId = jwtPayload.userId;
            next();
        } catch (err) {
            res.status(401).send({message: 'Unauthorized'});
        }
    } else {
        res.status(401).send({message: 'Unauthorized'});
    }
}

export function addUserInfo(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        try {
            const jwtPayload = jwt.verify(req.headers.authorization, process.env["SECRET_JWT_KEY"] as Secret) as JWTPayload;
            res.locals.userId = jwtPayload.userId;
        } catch (err) {
            res.locals.userId = -1;
        } finally {
            next();
        }
    } else {
        res.locals.userId = -1;
        next();
    }
}