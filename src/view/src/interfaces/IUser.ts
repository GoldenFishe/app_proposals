export interface IUser {
    id: number;
    login: string;
    username: string;
    accessToken: string;
}

export interface IAuthor {
    id: IUser["id"],
    username: IUser["username"]
}