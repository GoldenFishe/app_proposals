import {MainActionTypes, ProposalState} from "./types";
import {DISLIKE_COMMENT, GET_PROPOSAL, LEAVE_COMMENT, LIKE_COMMENT, RESET_PROPOSAL, SET_PROPOSAL} from "./actionTypes";

const initialState: ProposalState = {
    data: null
}

const proposalReducer = (state = initialState, action: MainActionTypes): ProposalState => {
    switch (action.type) {
        case GET_PROPOSAL:
        case SET_PROPOSAL:
            return {
                ...state,
                data: action.payload
            }
        case LEAVE_COMMENT:
        case LIKE_COMMENT:
        case DISLIKE_COMMENT:
            if (state.data !== null) {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        comments: action.payload
                    }
                }
            }
            return {...state};
        case RESET_PROPOSAL:
            return {...initialState};
        default:
            return state;
    }
}

export default proposalReducer;