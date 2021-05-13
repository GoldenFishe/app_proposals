import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {GetProposalAction, LeaveCommentAction, SetProposalAction} from './types';
import HttpClient from "../../httpClient";
import {GET_PROPOSAL, LEAVE_COMMENT, RESET_PROPOSAL, SET_PROPOSAL} from "./actionTypes";
import {RootState} from "../../rootReducer";
import {IProposal} from "../../interfaces/IProposal";
import {IComment} from "../../interfaces/IComment";

type CreateProposalForm = {
    title: string;
    description: string;
    topicId: number;
}

export const getProposal = (id: number): ThunkAction<void, RootState, unknown, GetProposalAction> => async (dispatch: Dispatch<GetProposalAction>) => {
    try {
        const data = await HttpClient.get<IProposal>(`/api/proposals/${id}`);
        dispatch({type: GET_PROPOSAL, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const createProposal = ({title, description, topicId}: CreateProposalForm): ThunkAction<void, RootState, unknown, SetProposalAction> => async (dispatch: Dispatch<SetProposalAction>) => {
    try {
        const data = await HttpClient.post<IProposal>(`/api/proposals`, {title, description, topicId});
        dispatch({type: SET_PROPOSAL, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const leaveComment = (comment: string, proposalId: number): ThunkAction<void, RootState, unknown, LeaveCommentAction> => async (dispatch: Dispatch<LeaveCommentAction>) => {
    try {
        const data = await HttpClient.post<IComment>(`/api/comments`, {comment, proposalId});
        dispatch({type: LEAVE_COMMENT, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const resetProposal = () => ({type: RESET_PROPOSAL});