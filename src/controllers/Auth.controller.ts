import {Request, Response} from "express";
import UserService from "../services/User.service";
import IUser from "../interfaces/User.interface";

class AuthController {
    async signIn(req: Request, res: Response): Promise<void> {
        const {login, password}: { login: string, password: string } = req.body;
        const user: IUser = await UserService.selectByLoginAndPassword(login, password);
        res.send(user);
    }

    async signUp(req: Request, res: Response): Promise<void> {
        const {login, password}: { login: string, password: string } = req.body;
        const user: IUser = await UserService.add(login, password);
        res.send(user);
    }
}

export default new AuthController();