import {IUser} from "../../types/IUser";
import {GET_USER} from "./actionTypes";

export interface GetUserAction {
    type: typeof GET_USER,
    payload: IUser
}

export interface MainState {
    user: IUser | null
}

export type MainActionTypes = GetUserAction;