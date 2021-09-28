import {ADD_NOTIFICATION, GET_TAGS, REMOVE_NOTIFICATION} from "./actionTypes";
import {ITag} from "../../types/IProposal";
import {GET_USER_PROFILE} from "../Profile/actionTypes";
import {INotification} from "../../types/INotification";

export interface GetTagsAction {
    type: typeof GET_TAGS,
    payload: ITag[]
}

export interface SignOutAction {
    type: typeof GET_USER_PROFILE,
    payload: null
}

export interface AddNotificationAction {
    type: typeof ADD_NOTIFICATION,
    payload: INotification
}

export interface RemoveNotificationAction {
    type: typeof REMOVE_NOTIFICATION,
    payload: INotification["id"]
}

export interface MainState {
    tags: ITag[],
    notifications: INotification[]
}


export type MainActionTypes = GetTagsAction | SignOutAction | AddNotificationAction | RemoveNotificationAction;