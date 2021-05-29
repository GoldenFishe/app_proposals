import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {GetUserAction} from './types';
import HttpClient from "../../httpClient";
import {GET_USER} from "./actionTypes";
import {RootState} from "../../rootReducer";
import {IUser} from "../../interfaces/IUser";

export const getUser = (): ThunkAction<void, RootState, unknown, GetUserAction> => async (dispatch: Dispatch<GetUserAction>) => {
    try {
        const data = await HttpClient.get<IUser>('/api/user');
        dispatch({type: GET_USER, payload: data || null});
    } catch (err) {
        console.error(err);
    }
}