import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {RootState} from "../../rootReducer";
import {SignInAction, User} from "./types";
import HttpClient from "../../httpClient";
import {SIGN_IN} from "./actionTypes";

export const signIn = (login: string, password: string): ThunkAction<void, RootState, unknown, SignInAction> => async (dispatch: Dispatch<SignInAction>) => {
    try {
        const data: User = await HttpClient.post('/api/user/sign-in', {login, password});
        dispatch({type: SIGN_IN, payload: data});
    } catch (err) {
        console.error(err);
    }
}