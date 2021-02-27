import jwt from 'jsonwebtoken';

import {Request, Response} from "express";
import {IUserRepository} from "./User.repository";
import {IUserDTO} from "./User.dto";

export class UserController {
    userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async signUp(req: Request, res: Response) {
        const {login, password}: { login: string, password: string } = req.body;
        const user: IUserDTO = await this.userRepository.create(login, password);
        res.send(user);
    }

    async signIn(req: Request, res: Response) {
        try {
            const {login, password}: { login: string, password: string } = req.body;
            const user: IUserDTO = await this.userRepository.getByLoginAndPassword(login, password);
            const refreshToken: string = await this.userRepository.createRefreshToken(user.id, 'refreshToken');
            const accessToken = jwt.sign({foo: 'bar'}, 'shhhhh');
            res.cookie('refreshToken', refreshToken, {httpOnly: true, path: '/api/user'}).send({...user, accessToken});
        } catch (err) {
            res.status(404).send(err.message);
        }
    }
}