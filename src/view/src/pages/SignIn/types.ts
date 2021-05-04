import {IUser} from "../../interfaces/IUser";
import {GET_USER} from "../Main/actionTypes";

export interface SignInAction {
    type: typeof GET_USER,
    payload: IUser
}