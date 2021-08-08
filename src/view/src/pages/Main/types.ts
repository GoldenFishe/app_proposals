import {GET_TAGS} from "./actionTypes";
import {ITag} from "../../types/IProposal";

export interface GetTagsAction {
    type: typeof GET_TAGS,
    payload: ITag[]
}

export interface MainState {
    tags: ITag[]
}


export type MainActionTypes = GetTagsAction;