import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

import {RootState} from "../../rootReducer";
import {IUser} from "../../interfaces/IUser";
import HttpClient from "../../httpClient";
import {GET_USER} from "../Main/actionTypes";
import {UploadAvatarAction} from "./types";

export const uploadAvatar = (avatar: FormData): ThunkAction<void, RootState, unknown, UploadAvatarAction> => async (dispatch: Dispatch<UploadAvatarAction>) => {
    try {
        const user = await HttpClient.post<IUser>('/api/user/avatar', avatar, true);
        dispatch({type: GET_USER, payload: user});
    } catch (err) {
        console.error(err);
    }
}