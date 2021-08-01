export interface IUser {
    id: number;
    login: string;
    username: string;
    avatar: string | null;
}

export interface IAuthor {
    id: IUser["id"];
    username: IUser["username"];
    avatar: IUser["avatar"]
}