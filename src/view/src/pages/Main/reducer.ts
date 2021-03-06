import {MainActionTypes, MainState} from "./types";
import {SIGN_IN} from "../SignIn/actionTypes";

const initialState: MainState = {
    user: null
}

const mainReducer = (state = initialState, action: MainActionTypes): MainState => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default mainReducer;