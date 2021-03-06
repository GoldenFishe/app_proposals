import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {GetProposalsAction, Proposal, ResetProposalsAction} from './types';
import HttpClient from "../../httpClient";
import {GET_PROPOSALS, RESET_PROPOSALS} from "./actionTypes";
import {RootState} from "../../rootReducer";

export const getProposals = (): ThunkAction<void, RootState, unknown, GetProposalsAction> => async (dispatch: Dispatch<GetProposalsAction>) => {
    try {
        const data: Proposal[] = await HttpClient.get('/api/proposals');
        dispatch({type: GET_PROPOSALS, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const resetProposals = (): ResetProposalsAction => ({type: RESET_PROPOSALS});