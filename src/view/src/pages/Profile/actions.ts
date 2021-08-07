import {Dispatch} from "redux";

import {IUser} from "../../types/IUser";
import HttpClient from "../../httpClient";
import {GET_USER_PROFILE, GET_VIEW_PROFILE, RESET_VIEW_PROFILE} from "./actionTypes";
import {GetUserProfileAction, GetViewProfileAction} from "./types";

export const updateProfile = (settings: FormData) => async (dispatch: Dispatch<GetUserProfileAction>) => {
    try {
        const user = await HttpClient.post<IUser>("/api/user", settings, true);
        dispatch({type: GET_USER_PROFILE, payload: user});
    } catch (err) {
        console.error(err);
    }
}

export const getUserProfile = () => async (dispatch: Dispatch<GetUserProfileAction>) => {
    try {
        const data = await HttpClient.get<IUser>("/api/user", true);
        dispatch({type: GET_USER_PROFILE, payload: data || null});
    } catch (err) {
        console.error(err);
    }
}

export const getViewProfile = (id: number) => async (dispatch: Dispatch<GetViewProfileAction>) => {
    try {
        const user = await HttpClient.get<IUser>(`/api/user/${id}`);
        dispatch({type: GET_VIEW_PROFILE, payload: user});
    } catch (err) {
        console.error(err);
    }
}

export const resetViewProfile = () => ({type: RESET_VIEW_PROFILE})