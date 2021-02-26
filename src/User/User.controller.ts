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
        const {login, password}: { login: string, password: string } = req.body;
        const user: IUserDTO = await this.userRepository.getByLoginAndPassword(login, password);
        res.send(user);
    }
}