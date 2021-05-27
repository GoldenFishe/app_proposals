import {IRefreshSession, IRefreshSessionDTO, IUser, IUserDTO} from "./User.types";
import Utils from "../utils";

export class UserMapper {
    public static toDTO(user: IUser): IUserDTO {
        return {
            id: user.id,
            login: user.login,
            username: user.username,
            accessToken: user.access_token,
            avatar: user.avatar_filename && Utils.getAvatarPath(user.avatar_filename)
        }
    }
}

export class RefreshSessionMapper {
    public static toDTO(refreshSession: IRefreshSession): IRefreshSessionDTO {
        return {
            id: refreshSession.id,
            userId: refreshSession.user_id,
            refreshToken: refreshSession.refresh_token,
            expiresIn: refreshSession.expires_in,
            createdAt: refreshSession.created_at,
        }
    }
}