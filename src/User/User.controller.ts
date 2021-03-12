import jwt, {Secret} from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";

import {IUserRepository} from "./User.repository";
import {IUserDTO} from "./User.dto";

export class UserController {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    private async generateTokens(userId: IUserDTO["id"]): Promise<{ refreshToken: string, accessToken: string }> {
        const generatedAccessToken = jwt.sign({
            data: {userId: userId},
            exp: process.env["JWT_EXP"]
        }, process.env["SECRET_JWT_KEY"] as Secret);
        const refreshTokenPromise: Promise<string> = this.userRepository.setRefreshToken(userId, Date.now().toString());
        const accessTokenPromise: Promise<string> = this.userRepository.setAccessToken(generatedAccessToken, userId);
        const [refreshToken, accessToken] = await Promise.all([refreshTokenPromise, accessTokenPromise]);
        return {refreshToken, accessToken};
    }

    async signUp(req: Request, res: Response) {
        const {login, password}: { login: string, password: string } = req.body;
        if (login && password) {
            const user: IUserDTO = await this.userRepository.create(login, password);
            const {refreshToken, accessToken} = await this.generateTokens(user.id);
            res.cookie('refresh_token', refreshToken, {httpOnly: true}).send({...user, accessToken});
        }
        res.status(400).send({message: 'Login and password are required'});
    }

    async signIn(req: Request, res: Response) {
        const {login, password}: { login: string, password: string } = req.body;
        if (login && password) {
            const user: IUserDTO = await this.userRepository.getByLoginAndPassword(login, password);
            const {refreshToken, accessToken} = await this.generateTokens(user.id);
            res.cookie('refresh_token', refreshToken, {httpOnly: true}).send({...user, accessToken});
        } else {
            res.status(404).send({message: 'Login and password are required'});
        }
    }

    async getAccessToken(req: Request, res: Response) {
        const {refresh_token}: { refresh_token: string } = req.cookies;
        let accessToken: string | null = null;
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