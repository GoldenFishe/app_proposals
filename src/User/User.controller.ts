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

    async signIn(req: Request, res: Response) {
        const {login, password}: { login: string, password: string } = req.body;
        try {
            const user = await this.userRepository.getByLoginAndPassword(login, password);
            const {refreshToken, accessToken} = await this.generateTokens(user.id);
            res.cookie('refresh_token', refreshToken, this.refreshTokenCookieOptions).send({...user, accessToken});
        } catch (e) {
            res.status(400).send({message: `User with login ${login} doesn't exist`});
        }
    }

    async signUp(req: Request, res: Response) {
        const {login, password}: { login: string, password: string } = req.body;
        const user = await this.userRepository.create(login, password);
        const {refreshToken, accessToken} = await this.generateTokens(user.id);
        res.cookie('refresh_token', refreshToken, this.refreshTokenCookieOptions).send({...user, accessToken});
    }

    async getAccessToken(req: Request, res: Response) {
        try {
            const {refresh_token}: { refresh_token: string } = req.cookies;
            const accessToken = await this.userRepository.getAccessToken(refresh_token);
            res.send({accessToken});
        } catch (e) {
            res.status(401).send({message: 'Unauthorized'})
        }
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

    async getUserInfo(req: Request, res: Response) {
        res.send({login: 'login', id: 0, accessToken: new Date()});
    }

    private async generateTokens(userId: IUserDTO["id"]): Promise<{ refreshToken: AuthTokens.RefreshToken, accessToken: AuthTokens.AccessToken }> {
        const generatedAccessToken = jwt.sign(
            {userId},
            process.env["SECRET_JWT_KEY"] as Secret,
            {expiresIn: Number(process.env["JWT_EXP"])}
        );
        const refreshTokenPromise = this.userRepository.setRefreshToken(userId, Date.now().toString());
        const accessTokenPromise = this.userRepository.setAccessToken(userId, generatedAccessToken);
        const [refreshToken, accessToken] = await Promise.all([refreshTokenPromise, accessTokenPromise]);
        return {refreshToken, accessToken};
    }
}