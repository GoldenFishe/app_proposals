export namespace AuthTokens {
    export type RefreshToken = string;
    export type AccessToken = string;
}

export interface IUser {
    id: number;
    login: string;
    access_token: AuthTokens.AccessToken
}

export interface IUserDTO {
    id: IUser["id"];
    login: IUser["login"];
    accessToken: AuthTokens.AccessToken;
}