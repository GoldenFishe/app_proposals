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

export type GeneratedTokens = {
    refreshToken: AuthTokens.RefreshToken,
    accessToken: AuthTokens.AccessToken
}

export interface IRefreshSession {
    id: number;
    user_id: IUser["id"];
    refresh_token: string;
    expires_in: string;
    created_at: string;
}

export interface IRefreshSessionDTO {
    id: IRefreshSession["id"];
    userId: IRefreshSession["user_id"];
    refreshToken: IRefreshSession["refresh_token"];
    expiresIn: IRefreshSession["expires_in"];
    createdAt: IRefreshSession["created_at"];
}