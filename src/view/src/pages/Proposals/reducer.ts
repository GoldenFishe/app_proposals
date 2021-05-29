import {ProposalsActionTypes, ProposalsState} from "./types";
import {DISLIKE_PROPOSAL, GET_PROPOSALS, LIKE_PROPOSAL, RESET_PROPOSALS} from "./actionTypes";

const initialState: ProposalsState = {
    data: []
}

const proposalsReducer = (state = initialState, action: ProposalsActionTypes): ProposalsState => {
    switch (action.type) {
        case GET_PROPOSALS:
            return {
                ...state,
                data: action.payload
            }
        case LIKE_PROPOSAL:
        case DISLIKE_PROPOSAL: {
            const targetIndex = state.data.findIndex(proposal => proposal.id === action.payload.id);
            const data = [...state.data];
            data[targetIndex] = action.payload;
            return {
                ...state,
                data
            }
        }
        case RESET_PROPOSALS:
            return {...initialState};
        default:
            return state;
    }
}

export default proposalsReducer;