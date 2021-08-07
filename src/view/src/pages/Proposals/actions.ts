import {Dispatch} from "redux";

import {DislikeProposalAction, GetProposalsAction, LikeProposalAction, ResetProposalsAction} from "./types";
import HttpClient from "../../httpClient";
import {DISLIKE_PROPOSAL, GET_PROPOSALS, LIKE_PROPOSAL, RESET_PROPOSALS} from "./actionTypes";
import {IProposalPreview} from "../../types/IProposal";

export const getProposals = () => async (dispatch: Dispatch<GetProposalsAction>) => {
    try {
        const data = await HttpClient.get<IProposalPreview[]>("/api/proposals");
        dispatch({type: GET_PROPOSALS, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const likeProposal = (proposalId: number) => async (dispatch: Dispatch<LikeProposalAction>) => {
    try {
        const data = await HttpClient.post<IProposalPreview>("/api/proposals/like", {proposalId}, true);
        dispatch({type: LIKE_PROPOSAL, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const dislikeProposal = (proposalId: number) => async (dispatch: Dispatch<DislikeProposalAction>) => {
    try {
        const data = await HttpClient.post<IProposalPreview>("/api/proposals/dislike", {proposalId}, true);
        dispatch({type: DISLIKE_PROPOSAL, payload: data});
    } catch (err) {
        console.error(err);
    }
}

export const resetProposals = (): ResetProposalsAction => ({type: RESET_PROPOSALS});