import {Dispatch} from "redux";

import {SignInAction} from "./types";
import HttpClient from "../../httpClient";
import {IUser} from "../../types/IUser";
import {GET_USER} from "../Main/actionTypes";

export const signIn = (login: string, password: string) => async (dispatch: Dispatch<SignInAction>) => {
    try {
        const data = await HttpClient.post<IUser>("/api/user/sign-in", {login, password});
        dispatch({type: GET_USER, payload: data});
    } catch (err) {
        console.error(err);
    }
}