import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {RootState} from "../../rootReducer";
import {SignUpAction} from "./types";
import HttpClient from "../../httpClient";
import {IUser} from "../../interfaces/IUser";
import {GET_USER} from "../Main/actionTypes";

export const signUp = (login: string, password: string): ThunkAction<void, RootState, unknown, SignUpAction> => async (dispatch: Dispatch<SignUpAction>) => {
    try {
        const data: IUser = await HttpClient.post('/api/user/sign-up', {login, password});
        dispatch({type: GET_USER, payload: data});
    } catch (err) {
        console.error(err);
    }
}