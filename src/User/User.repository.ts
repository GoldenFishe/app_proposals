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
}

export class UserRepository implements IUserRepository {
    async create(login: string, password: string): Promise<IUserDTO> {
        const [user]: IUser[] = await query(`INSERT INTO users (login, password) VALUES ('${login}', '${password}') RETURNING *`);
        return UserMapper.toDTO(user);
    }

    async getByLoginAndPassword(login: string, password: string): Promise<IUserDTO> {
        const [user]: IUser[] = await query(`SELECT * FROM users WHERE login = '${login} AND password = '${password}'`);
        return UserMapper.toDTO(user);
    }
}