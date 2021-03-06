import {GET_PROPOSALS, RESET_PROPOSALS} from './actionTypes';

export interface ProposalsState {
    data: Proposal[]
}

export interface Comment {
    id: number;
    comment: string;
    authorId: number;
    proposalId: number;
    rating: number;
}

export interface Proposal {
    id: number;
    title: string;
    description: string;
    authorId: number;
    topicId: number;
    rating: number;
    comments: Comment[]
}

export interface GetProposalsAction {
    type: typeof GET_PROPOSALS,
    payload: Proposal[]
}

export interface ResetProposalsAction {
    type: typeof RESET_PROPOSALS
}

export type ProposalsActionTypes = GetProposalsAction | ResetProposalsAction;