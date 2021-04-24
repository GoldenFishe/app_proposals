import {IUser, IUserDTO} from "./User.types";

export class UserMapper {
    public static toDTO(user: IUser): IUserDTO {
        return {
            id: user.id,
            login: user.login,
            accessToken: user.access_token
        }
    }
}