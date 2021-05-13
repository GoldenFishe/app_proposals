import {GET_PROPOSALS, RESET_PROPOSALS} from './actionTypes';
import {IProposal} from "../../interfaces/IProposal";

export interface ProposalsState {
    data: IProposal[]
}

export interface GetProposalsAction {
    type: typeof GET_PROPOSALS,
    payload: IProposal[]
}

export interface ResetProposalsAction {
    type: typeof RESET_PROPOSALS
}

export type ProposalsActionTypes = GetProposalsAction | ResetProposalsAction;