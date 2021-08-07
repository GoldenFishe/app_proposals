import {Dispatch} from "redux";

import {SignUpAction} from "./types";
import HttpClient from "../../httpClient";
import {IUser} from "../../types/IUser";
import {GET_USER_PROFILE} from "../Profile/actionTypes";

export const signUp = (login: string, password: string) => async (dispatch: Dispatch<SignUpAction>) => {
    try {
        const data = await HttpClient.post<IUser>("/api/user/sign-up", {login, password});
        dispatch({type: GET_USER_PROFILE, payload: data});
    } catch (err) {
        console.error(err);
    }
}