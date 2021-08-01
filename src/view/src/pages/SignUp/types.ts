import {IUser} from "../../types/IUser";
import {GET_USER} from "../Main/actionTypes";

export interface SignUpAction {
    type: typeof GET_USER,
    payload: IUser
}