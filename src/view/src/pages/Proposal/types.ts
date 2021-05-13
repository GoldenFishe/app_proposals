import {IProposal} from "../../interfaces/IProposal";
import {IComment} from "../../interfaces/IComment";
import {GET_PROPOSAL, LEAVE_COMMENT, RESET_PROPOSAL, SET_PROPOSAL} from "./actionTypes";

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

export interface ResetProposalAction {
    type: typeof RESET_PROPOSAL
}


export interface ProposalState {
    data: IProposal | null
}

export type MainActionTypes = GetProposalAction | SetProposalAction | LeaveCommentAction | ResetProposalAction;