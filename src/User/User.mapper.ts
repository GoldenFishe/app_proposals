import {IUser, IUserDTO} from "./User.types";
import Utils from "../utils";

export class UserMapper {
    public static toDTO(user: IUser): IUserDTO {
        return {
            id: user.id,
            login: user.login,
            username: user.username,
            accessToken: user.access_token,
            avatar: Utils.getAvatar(user.id) && `/resources/avatar/${user.id}`
        }
    }
}