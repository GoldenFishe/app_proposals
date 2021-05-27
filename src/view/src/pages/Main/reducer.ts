import {MainActionTypes, MainState} from "./types";
import {GET_USER} from "./actionTypes";

const initialState: MainState = {
    user: null
}

const mainReducer = (state = initialState, action: MainActionTypes): MainState => {
    switch (action.type) {
        case GET_USER: {
            const {id, login, username, avatar} = action.payload;
            return {
                ...state,
                user: {id, login, username, avatar}
            }
        }
        default:
            return state;
    }
}

export default mainReducer;