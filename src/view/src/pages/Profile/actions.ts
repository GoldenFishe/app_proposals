import {Dispatch} from "redux";

import {IUser} from "../../types/IUser";
import HttpClient from "../../httpClient";
import {GET_USER} from "../Main/actionTypes";
import {GetUserAction} from "../Main/types";

export const updateSettings = (settings: FormData) => async (dispatch: Dispatch<GetUserAction>) => {
    try {
        const user = await HttpClient.post<IUser>('/api/user', settings);
        dispatch({type: GET_USER, payload: user});
    } catch (err) {
        console.error(err);
    }
}