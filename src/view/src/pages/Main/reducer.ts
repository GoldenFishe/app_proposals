import {MainActionTypes, MainState} from "./types";
import {GET_TAGS} from "./actionTypes";

const initialState: MainState = {
    tags: []
}

const mainReducer = (state = initialState, action: MainActionTypes): MainState => {
    switch (action.type) {
        case GET_TAGS: {

            return {
                ...state,
                tags: action.payload
            }
        }
        default:
            return state;
    }
}

export default mainReducer;