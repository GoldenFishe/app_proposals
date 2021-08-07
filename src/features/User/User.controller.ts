import jwt, {Secret} from 'jsonwebtoken';
import {CookieOptions, Request, Response} from "express";

import {IUserRepository} from "./User.repository";
import {GeneratedTokens, IUserDTO, JWTPayload} from "./User.types";
import {getDataFromEnvironment} from "../../utils/env";

export interface IUserController {
    signIn(req: Request, res: Response): Promise<void>;

    signUp(req: Request, res: Response): Promise<void>;

    getAccessToken(req: Request, res: Response): Promise<void>;

    getUserInfo(req: Request, res: Response): Promise<void>;

    setUserInfo(req: Request, res: Response): Promise<void>;

    getUserInfoById(req: Request, res: Response): Promise<void>;
}

export class UserController implements IUserController {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
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
            const refreshSession = await this.userRepository.getRefreshSession(refresh_token);
            if (refreshSession) {
                const {refreshToken, accessToken} = await this.generateTokens(refreshSession.userId);
                res.cookie('refresh_token', refreshToken, this.refreshTokenCookieOptions).send({accessToken});
            } else {
                res.status(401).send({message: 'Unauthorized'});
            }
        } catch (e) {
            res.status(401).send({message: 'Unauthorized'});
        }
    }

    async getUserInfo(req: Request, res: Response) {
        const {userId} = res.locals;
        const user = await this.userRepository.getById(userId);
        res.status(200).send(user);
    }

    async getUserInfoById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = await this.userRepository.getById(id);
        res.status(200).send(user);
    }

    async setUserInfo(req: Request, res: Response) {
        const {login, password, username}: { login?: string, password?: string, username?: string } = req.body;
        const {userId} = res.locals;
        const filename = req.file?.filename;
        const user = await this.userRepository.updateUser(userId, login, password, username, filename);
        res.status(200).send(user);
    }

    private async generateTokens(userId: IUserDTO["id"]): Promise<GeneratedTokens> {
        const jwtPayload: JWTPayload = {userId};
        const generatedAccessToken = jwt.sign(
            jwtPayload,
            getDataFromEnvironment("SECRET_JWT_KEY") as Secret,
            {expiresIn: Number(getDataFromEnvironment("JWT_EXP"))}
        );
        const refreshTokenPromise = this.userRepository.setRefreshToken(userId, Date.now().toString());
        const accessTokenPromise = this.userRepository.setAccessToken(userId, generatedAccessToken);
        const [refreshToken, accessToken] = await Promise.all([refreshTokenPromise, accessTokenPromise]);
        return {refreshToken, accessToken};
    }

    private get refreshTokenCookieOptions(): CookieOptions {
        return {httpOnly: true, maxAge: Number(getDataFromEnvironment("JWT_EXP")) * 2}
    }
}