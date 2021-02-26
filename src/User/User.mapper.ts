import {IUserDTO} from "./User.dto";
import {IUser} from "./User.repository";

export class UserMapper {
    public static toDTO(user: IUser): IUserDTO {
        return {
            id: user.id,
            login: user.login,
            password: user.password
        }
    }
}