import {IUser} from "../../types/IUser";
import {GET_USER_PROFILE} from "../Profile/actionTypes";

export interface SignUpAction {
    type: typeof GET_USER_PROFILE,
    payload: IUser
}