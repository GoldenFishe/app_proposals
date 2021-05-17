import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

import {
    DislikeCommentAction,
    GetProposalAction,
    LeaveCommentAction,
    LikeCommentAction,
    SetProposalAction
} from './types';
import HttpClient from "../../httpClient";
import {DISLIKE_COMMENT, GET_PROPOSAL, LEAVE_COMMENT, LIKE_COMMENT, RESET_PROPOSAL, SET_PROPOSAL} from "./actionTypes";
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
        const data = await HttpClient.post<IProposal>(`/api/proposals`, {title, description, topicId}, true);
        dispatch({type: SET_PROPOSAL, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const leaveComment = (comment: string, proposalId: number, parentCommentId: number | null): ThunkAction<void, RootState, unknown, LeaveCommentAction> => async (dispatch: Dispatch<LeaveCommentAction>) => {
    try {
        const data = await HttpClient.post<IComment>(`/api/comments`, {comment, proposalId, parentCommentId}, true);
        dispatch({type: LEAVE_COMMENT, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const likeComment = (commentId: number): ThunkAction<void, RootState, unknown, LikeCommentAction> => async (dispatch: Dispatch<LikeCommentAction>) => {
    try {
        const data = await HttpClient.post<IComment>(`/api/comments/like`, {commentId}, true);
        dispatch({type: LIKE_COMMENT, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const dislikeComment = (commentId: number): ThunkAction<void, RootState, unknown, DislikeCommentAction> => async (dispatch: Dispatch<DislikeCommentAction>) => {
    try {
        const data = await HttpClient.post<IComment>(`/api/comments/dislike`, {commentId}, true);
        dispatch({type: DISLIKE_COMMENT, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const resetProposal = () => ({type: RESET_PROPOSAL});