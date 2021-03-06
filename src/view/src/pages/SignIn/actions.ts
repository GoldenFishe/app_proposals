import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {RootState} from "../../rootReducer";
import {SignInAction} from "./types";
import HttpClient from "../../httpClient";
import {IUser} from "../../interfaces/IUser";
import {GET_USER} from "../Main/actionTypes";

export const signIn = (login: string, password: string): ThunkAction<void, RootState, unknown, SignInAction> => async (dispatch: Dispatch<SignInAction>) => {
    try {
        const data: IUser = await HttpClient.post('/api/user/sign-in', {login, password});
        dispatch({type: GET_USER, payload: data});
    } catch (err) {
        console.error(err);
    }
}