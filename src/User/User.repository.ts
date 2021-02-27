import {query} from "../db";
import {UserMapper} from "./User.mapper";
import {IUserDTO} from "./User.dto";

export interface IUser {
    id: number;
    login: string;
    password: string;
}

export interface IUserRepository {
    create(login: string, password: string): Promise<IUserDTO>;

    getByLoginAndPassword(login: string, password: string): Promise<IUserDTO>;

    createRefreshToken(userId: IUserDTO["id"], refreshToken: string): Promise<string>;
}

export class UserRepository implements IUserRepository {
    async create(login: string, password: string): Promise<IUserDTO> {
        const [user]: IUser[] = await query(`INSERT INTO users (login, password) VALUES ('${login}', '${password}') RETURNING *`);
        return UserMapper.toDTO(user);
    }

    async getByLoginAndPassword(login: string, password: string): Promise<IUserDTO> {
        const [user]: IUser[] = await query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`);
        if (!user) throw new Error("User doesn't exist")
        return UserMapper.toDTO(user);
    }

    async createRefreshToken(userId: IUserDTO["id"], refreshToken: string): Promise<string> {
        const [token]: string[] = await query(`INSERT INTO refresh_sessions (user_id, refresh_token, expires_in) VALUES (${userId}, '${refreshToken}', 123) RETURNING refresh_token`);
        return token;
    }
}