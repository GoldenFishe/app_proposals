import {DISLIKE_PROPOSAL, GET_PROPOSALS, LIKE_PROPOSAL, RESET_PROPOSALS} from './actionTypes';
import {IProposalPreview} from "../../types/IProposal";

export interface ProposalsState {
    data: IProposalPreview[]
}

export interface GetProposalsAction {
    type: typeof GET_PROPOSALS,
    payload: IProposalPreview[]
}

export interface LikeProposalAction {
    type: typeof LIKE_PROPOSAL,
    payload: IProposalPreview
}

export interface DislikeProposalAction {
    type: typeof DISLIKE_PROPOSAL,
    payload: IProposalPreview
}

export interface ResetProposalsAction {
    type: typeof RESET_PROPOSALS
}

export type ProposalsActionTypes =
    | GetProposalsAction
    | LikeProposalAction
    | DislikeProposalAction
    | ResetProposalsAction;