import {IUser} from "../../interfaces/IUser";
import {GET_USER} from "../Main/actionTypes";

export interface UploadAvatarAction {
    type: typeof GET_USER,
    payload: IUser
}