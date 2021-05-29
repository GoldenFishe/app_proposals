import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

import {RootState} from "../../rootReducer";
import {IUser} from "../../interfaces/IUser";
import HttpClient from "../../httpClient";
import {GET_USER} from "../Main/actionTypes";
import {GetUserAction} from "../Main/types";

export const updateSettings = (settings: FormData): ThunkAction<void, RootState, unknown, GetUserAction> => async (dispatch: Dispatch<GetUserAction>) => {
    try {
        const user = await HttpClient.post<IUser>('/api/user', settings);
        dispatch({type: GET_USER, payload: user});
    } catch (err) {
        console.error(err);
    }
}