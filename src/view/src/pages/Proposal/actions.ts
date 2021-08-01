import {Dispatch} from "redux";

import {
    DislikeCommentAction,
    GetProposalAction,
    LeaveCommentAction,
    LikeCommentAction,
    SetProposalAction
} from './types';
import HttpClient from "../../httpClient";
import {DISLIKE_COMMENT, GET_PROPOSAL, LEAVE_COMMENT, LIKE_COMMENT, RESET_PROPOSAL, SET_PROPOSAL} from "./actionTypes";

import {IProposal} from "../../types/IProposal";
import {IComment} from "../../types/IComment";

export const getProposal = (id: number) => async (dispatch: Dispatch<GetProposalAction>) => {
    try {
        const data = await HttpClient.get<IProposal>(`/api/proposals/${id}`);
        dispatch({type: GET_PROPOSAL, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const createProposal = (proposalParams: FormData) => async (dispatch: Dispatch<SetProposalAction>) => {
    try {
        const data = await HttpClient.post<IProposal>("/api/proposals", proposalParams);
        dispatch({type: SET_PROPOSAL, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const leaveComment = (commentParams: FormData) => async (dispatch: Dispatch<LeaveCommentAction>) => {
    try {
        const data = await HttpClient.post<IComment[]>("/api/comments", commentParams);
        dispatch({type: LEAVE_COMMENT, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const likeComment = (commentId: number) => async (dispatch: Dispatch<LikeCommentAction>) => {
    try {
        const data = await HttpClient.post<IComment[]>("/api/comments/like", {commentId});
        dispatch({type: LIKE_COMMENT, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const dislikeComment = (commentId: number) => async (dispatch: Dispatch<DislikeCommentAction>) => {
    try {
        const data = await HttpClient.post<IComment[]>("/api/comments/dislike", {commentId});
        dispatch({type: DISLIKE_COMMENT, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const resetProposal = () => ({type: RESET_PROPOSAL});