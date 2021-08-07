import {IUser} from "../../types/IUser";
import {GET_USER_PROFILE, GET_VIEW_PROFILE, RESET_VIEW_PROFILE} from "./actionTypes";

export interface GetUserProfileAction {
    type: typeof GET_USER_PROFILE,
    payload: IUser
}

export interface GetViewProfileAction {
    type: typeof GET_VIEW_PROFILE,
    payload: IUser
}

export interface ResetViewProfileAction {
    type: typeof RESET_VIEW_PROFILE
}

export interface ProfileState {
    userProfile: IUser | null,
    viewProfile: IUser | null
}


export type ProfileActionTypes = GetUserProfileAction | GetViewProfileAction | ResetViewProfileAction;