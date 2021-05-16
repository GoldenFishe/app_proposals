import {IProposal} from "../../interfaces/IProposal";
import {IComment} from "../../interfaces/IComment";
import {DISLIKE_COMMENT, GET_PROPOSAL, LEAVE_COMMENT, LIKE_COMMENT, RESET_PROPOSAL, SET_PROPOSAL} from "./actionTypes";

export interface GetProposalAction {
    type: typeof GET_PROPOSAL,
    payload: IProposal
}

export interface SetProposalAction {
    type: typeof SET_PROPOSAL,
    payload: IProposal
}

export interface LeaveCommentAction {
    type: typeof LEAVE_COMMENT,
    payload: IComment
}

export interface LikeCommentAction {
    type: typeof LIKE_COMMENT,
    payload: IComment
}

export interface DislikeCommentAction {
    type: typeof DISLIKE_COMMENT,
    payload: IComment
}

export interface ResetProposalAction {
    type: typeof RESET_PROPOSAL
}


export interface ProposalState {
    data: IProposal | null
}

export type MainActionTypes = GetProposalAction | SetProposalAction | LeaveCommentAction | ResetProposalAction;