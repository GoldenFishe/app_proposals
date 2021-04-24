import jwt, {Secret} from 'jsonwebtoken';
import {CookieOptions, NextFunction, Request, Response} from "express";

import {IUserRepository} from "./User.repository";
import {AuthTokens, IUserDTO} from "./User.types";

export class UserController {
    private readonly userRepository: IUserRepository;
    private readonly refreshTokenCookieOptions: CookieOptions;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
        this.refreshTokenCookieOptions = {httpOnly: true, maxAge: Number(process.env["JWT_EXP"])};
    }

    private async generateTokens(userId: IUserDTO["id"]): Promise<{ refreshToken: AuthTokens.RefreshToken, accessToken: AuthTokens.AccessToken }> {
        const generatedAccessToken = jwt.sign(
            {userId},
            process.env["SECRET_JWT_KEY"] as Secret,
            {expiresIn: process.env["JWT_EXP"]}
        );
        const refreshTokenPromise = this.userRepository.setRefreshToken(userId, Date.now().toString());
        const accessTokenPromise = this.userRepository.setAccessToken(userId, generatedAccessToken);
        const [refreshToken, accessToken] = await Promise.all([refreshTokenPromise, accessTokenPromise]);
        return {refreshToken, accessToken};
    }

    async signUp(req: Request, res: Response) {
        const {login, password}: { login: string, password: string } = req.body;
        if (login && password) {
            const user = await this.userRepository.create(login, password);
            const {refreshToken, accessToken} = await this.generateTokens(user.id);
            res.cookie('refresh_token', refreshToken, this.refreshTokenCookieOptions).send({...user, accessToken});
        }
        res.status(400).send({message: 'Login and password are required'});
    }

    async signIn(req: Request, res: Response) {
        const {login, password}: { login: string, password: string } = req.body;
        if (login && password) {
            const user = await this.userRepository.getByLoginAndPassword(login, password);
            const {refreshToken, accessToken} = await this.generateTokens(user.id);
            res.cookie('refresh_token', refreshToken, this.refreshTokenCookieOptions).send({...user, accessToken});
        } else {
            res.status(400).send({message: 'Login and password are required'});
        }
    }

    async getAccessToken(req: Request, res: Response) {
        const {refresh_token}: { refresh_token: string } = req.cookies;
        let accessToken: AuthTokens.AccessToken | null = null;
        if (refresh_token) accessToken = await this.userRepository.getAccessToken(refresh_token);
        res.send({accessToken});
    }

    async checkAuthorize(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {
            try {
                jwt.verify(req.headers.authorization, process.env["SECRET_JWT_KEY"] as Secret);
                next();
            } catch (err) {
                res.status(401).send({message: 'Unauthorized'});
            }
        }
    }
}