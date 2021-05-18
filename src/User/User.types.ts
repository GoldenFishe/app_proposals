export namespace AuthTokens {
    export type RefreshToken = string;
    export type AccessToken = string;
}

export interface IUser {
    id: number;
    login: string;
    username: string;
    access_token: AuthTokens.AccessToken,
}

export interface IUserDTO {
    id: IUser["id"];
    login: IUser["login"];
    username: IUser["username"];
    accessToken: AuthTokens.AccessToken;
    avatar: string | null;
}

export interface IAuthor {
    id: IUser["id"],
    username: IUser["username"],
    avatar: string | null
}

export interface JWTPayload {
    userId: IUserDTO["id"]
}