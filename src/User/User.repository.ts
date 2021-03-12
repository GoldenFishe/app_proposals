import {query} from "../db";
import {UserMapper} from "./User.mapper";
import {IUserDTO} from "./User.dto";

export interface IUser {
    id: number;
    login: string;
    access_token: string;
}

export interface IUserRepository {
    create(login: string, password: string): Promise<IUserDTO>;

    getByLoginAndPassword(login: string, password: string): Promise<IUserDTO>;

    setRefreshToken(userId: IUserDTO["id"], refreshToken: string): Promise<string>;

    getAccessToken(refreshToken: string): Promise<string>;

    setAccessToken(accessToken: string, userId: IUserDTO["id"]): Promise<string>
}

export class UserRepository implements IUserRepository {
    async create(login: string, password: string): Promise<IUserDTO> {
        const [user]: IUser[] = await query(`INSERT INTO users (login, password) VALUES ('${login}', '${password}') RETURNING id, login, access_token`);
        return UserMapper.toDTO(user);
    }

    async getByLoginAndPassword(login: string, password: string): Promise<IUserDTO> {
        const [user]: IUser[] = await query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`);
        if (!user) throw new Error("User doesn't exist")
        return UserMapper.toDTO(user);
    }

    async setRefreshToken(userId: IUserDTO["id"], refreshToken: string): Promise<string> {
        const [token]: Array<{ refresh_token: string }> = await query(`INSERT INTO refresh_sessions (user_id, refresh_token, expires_in) VALUES (${userId}, '${refreshToken}', 123) RETURNING refresh_token`);
        return token.refresh_token;
    }

    async getAccessToken(refreshToken: string): Promise<string> {
        const [token]: Array<{ access_token: string }> = await query(`SELECT access_token FROM users WHERE id = (SELECT user_id FROM refresh_sessions WHERE refresh_token = '${refreshToken}')`);
        return token.access_token;
    }

    async setAccessToken(accessToken: string, userId: IUserDTO["id"]): Promise<string> {
        const [user]: IUser[] = await query(`UPDATE users SET access_token = '${accessToken}' WHERE id = ${userId} RETURNING access_token`);
        return user.access_token;
    }
}