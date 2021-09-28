import {Dispatch} from "redux";
import {nanoid} from "nanoid";

import HttpClient from "../../httpClient";
import {ADD_NOTIFICATION, GET_TAGS, REMOVE_NOTIFICATION} from "./actionTypes";
import {ITag} from "../../types/IProposal";
import {AddNotificationAction, GetTagsAction, RemoveNotificationAction, SignOutAction} from "./types";
import {GET_USER_PROFILE} from "../Profile/actionTypes";
import {INotification} from "../../types/INotification";

export const getTags = () => async (dispatch: Dispatch<GetTagsAction>) => {
    try {
        const tags = await HttpClient.get<ITag[]>("/api/proposals/tags");
        dispatch({type: GET_TAGS, payload: tags});
    } catch (err) {
        console.error(err);
    }
}

export const signOut = () => async (dispatch: Dispatch<SignOutAction>) => {
    try {
        await HttpClient.get<ITag[]>("/api/user/sign-out");
        dispatch({type: GET_USER_PROFILE, payload: null});
    } catch (err) {
        console.error(err);
    }
}

export const addNotification = (notification: Omit<INotification, "id">): AddNotificationAction => ({
    type: ADD_NOTIFICATION,
    payload: {...notification, id: nanoid()}
});

export const removeNotification = (id: INotification["id"]): RemoveNotificationAction => ({
    type: REMOVE_NOTIFICATION,
    payload: id
});