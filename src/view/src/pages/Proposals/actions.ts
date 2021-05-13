import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {GetProposalsAction, ResetProposalsAction} from './types';
import HttpClient from "../../httpClient";
import {GET_PROPOSALS, RESET_PROPOSALS} from "./actionTypes";
import {RootState} from "../../rootReducer";
import {IProposal} from "../../interfaces/IProposal";

export const getProposals = (): ThunkAction<void, RootState, unknown, GetProposalsAction> => async (dispatch: Dispatch<GetProposalsAction>) => {
    try {
        const data = await HttpClient.get<IProposal[]>('/api/proposals');
        dispatch({type: GET_PROPOSALS, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const resetProposals = (): ResetProposalsAction => ({type: RESET_PROPOSALS});