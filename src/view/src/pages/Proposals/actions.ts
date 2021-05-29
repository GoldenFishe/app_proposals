import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {DislikeProposalAction, GetProposalsAction, LikeProposalAction, ResetProposalsAction} from './types';
import HttpClient from "../../httpClient";
import {DISLIKE_PROPOSAL, GET_PROPOSALS, LIKE_PROPOSAL, RESET_PROPOSALS} from "./actionTypes";
import {RootState} from "../../rootReducer";
import {IProposalPreview} from "../../interfaces/IProposal";

export const getProposals = (): ThunkAction<void, RootState, unknown, GetProposalsAction> => async (dispatch: Dispatch<GetProposalsAction>) => {
    try {
        const data = await HttpClient.get<IProposalPreview[]>('/api/proposals');
        dispatch({type: GET_PROPOSALS, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const likeProposal = (proposalId: number): ThunkAction<void, RootState, unknown, LikeProposalAction> => async (dispatch: Dispatch<LikeProposalAction>) => {
    try {
        const data = await HttpClient.post<IProposalPreview>('/api/proposals/like', {proposalId});
        dispatch({type: LIKE_PROPOSAL, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const dislikeProposal = (proposalId: number): ThunkAction<void, RootState, unknown, DislikeProposalAction> => async (dispatch: Dispatch<DislikeProposalAction>) => {
    try {
        const data = await HttpClient.post<IProposalPreview>('/api/proposals/dislike', {proposalId});
        dispatch({type: DISLIKE_PROPOSAL, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const resetProposals = (): ResetProposalsAction => ({type: RESET_PROPOSALS});