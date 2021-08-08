import {Dispatch} from "redux";

import HttpClient from "../../httpClient";
import {GET_TAGS} from "./actionTypes";
import {ITag} from "../../types/IProposal";
import {GetTagsAction} from "./types";

export const getTags = () => async (dispatch: Dispatch<GetTagsAction>) => {
    try {
        const tags = await HttpClient.get<ITag[]>("/api/proposals/tags");
        dispatch({type: GET_TAGS, payload: tags});
    } catch (err) {
        console.error(err);
    }
}