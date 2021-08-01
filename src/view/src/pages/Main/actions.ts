import {Dispatch} from "redux";

import HttpClient from "../../httpClient";
import {IUser} from "../../types/IUser";
import {GetUserAction} from "./types";
import {GET_USER} from "./actionTypes";

export const getUser = () => async (dispatch: Dispatch<GetUserAction>) => {
    try {
        const data = await HttpClient.get<IUser>("/api/user");
        dispatch({type: GET_USER, payload: data || null});
    } catch (err) {
        console.error(err);
    }
}