import {query} from "../db";
import {RefreshSessionMapper, UserMapper} from "./User.mapper";
import {AuthTokens, IRefreshSession, IRefreshSessionDTO, IUser, IUserDTO} from "./User.types";
import Utils from "../utils";

export interface IUserRepository {
    create(login: string, password: string): Promise<IUserDTO>;

    getByLoginAndPassword(login: string, password: string): Promise<IUserDTO>;

    getById(id: number): Promise<IUserDTO>;

    getAll(): Promise<IUserDTO[]>;

    setRefreshToken(userId: IUserDTO["id"], refreshToken: AuthTokens.RefreshToken): Promise<AuthTokens.RefreshToken>;

    getRefreshSession(refreshToken: AuthTokens.RefreshToken): Promise<IRefreshSessionDTO | null>;

    getAccessToken(refreshToken: AuthTokens.AccessToken): Promise<AuthTokens.AccessToken | null>;

    setAccessToken(userId: IUserDTO["id"], accessToken: AuthTokens.AccessToken): Promise<AuthTokens.AccessToken>;

    updateUser(userId: IUserDTO["id"], login: string | undefined, password: string | undefined, username: string | undefined, avatarFilename: string | undefined): Promise<IUserDTO>;
}

export class UserRepository implements IUserRepository {
    async create(login: string, password: string) {
        const [user]: IUser[] = await query(`INSERT INTO users (login, password, username) VALUES ('${login}', '${password}', '${login}') RETURNING *`);
        return UserMapper.toDTO(user);
    }

    async getByLoginAndPassword(login: string, password: string) {
        const [user]: IUser[] = await query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`);
        if (!user) throw new Error(`User with login ${login} doesn't exist`);
        return UserMapper.toDTO(user);
    }

    async getById(id: number) {
        const [user]: IUser[] = await query(`SELECT * FROM users WHERE id = ${id}`);
        return UserMapper.toDTO(user);
    }

    async getAll() {
        const users: IUser[] = await query(`SELECT * FROM users`);
        return users.map(UserMapper.toDTO);
    }

    async getRefreshSession(refreshToken: AuthTokens.RefreshToken): Promise<IRefreshSessionDTO | null> {
        const [token]: Array<IRefreshSession> = await query(`SELECT * FROM refresh_sessions WHERE refresh_token = '${refreshToken}'`);
        return token !== null ? RefreshSessionMapper.toDTO(token) : null;
    }

    async setRefreshToken(userId: IUserDTO["id"], refreshToken: AuthTokens.RefreshToken) {
        const [token]: Array<{ refresh_token: AuthTokens.RefreshToken }> = await query(`INSERT INTO refresh_sessions (user_id, refresh_token, expires_in) VALUES (${userId}, '${refreshToken}', 123) RETURNING refresh_token`);
        return token.refresh_token;
    }

    async getAccessToken(refreshToken: AuthTokens.RefreshToken) {
        const [token]: Array<{ access_token: AuthTokens.AccessToken }> = await query(`SELECT access_token FROM users WHERE id = (SELECT user_id FROM refresh_sessions WHERE refresh_token = '${refreshToken}')`);
        return token !== null ? token.access_token : null;
    }

    async setAccessToken(userId: IUserDTO["id"], accessToken: AuthTokens.AccessToken) {
        const [user]: IUser[] = await query(`UPDATE users SET access_token = '${accessToken}' WHERE id = ${userId} RETURNING access_token`);
        return user.access_token;
    }

    async updateUser(userId: IUserDTO["id"], login: string | undefined, password: string | undefined, username: string | undefined, avatarFilename: string | undefined) {
        const userDTO = await this.getById(userId);
        if (userDTO.avatar) Utils.deleteAvatarFile(userDTO.avatar);
        let queryCommand = 'UPDATE users SET';
        if (login) queryCommand += ` login = '${login}'`;
        if (password) queryCommand += `${login ? ' ,' : ''} password = '${password}'`;
        if (username) queryCommand += `${(login || password) ? ' ,' : ''} username = '${username}'`;
        if (avatarFilename) queryCommand += `${(login || password || username) ? ' ,' : ''} avatar_filename = '${avatarFilename}'`;
        queryCommand += ` WHERE id = ${userId} RETURNING *`
        const [user]: IUser[] = await query(queryCommand);
        return UserMapper.toDTO(user);
    }
}