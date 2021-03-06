import {ProposalsActionTypes, ProposalsState} from "./types";
import {GET_PROPOSALS, RESET_PROPOSALS} from "./actionTypes";

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
        case RESET_PROPOSALS:
            return {...initialState};
        default:
            return state;
    }
}

export default proposalsReducer;