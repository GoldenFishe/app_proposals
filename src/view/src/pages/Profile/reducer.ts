import {ProfileActionTypes, ProfileState} from "./types";
import {GET_USER_PROFILE, GET_VIEW_PROFILE, RESET_VIEW_PROFILE} from "./actionTypes";

const initialState: ProfileState = {
    userProfile: null,
    viewProfile: null
}

const profileReducer = (state = initialState, action: ProfileActionTypes): ProfileState => {
    switch (action.type) {
        case GET_USER_PROFILE: {
            const {id, login, username, avatar} = action.payload;
            return {
                ...state,
                userProfile: {id, login, username, avatar}
            }
        }
        case GET_VIEW_PROFILE: {
            const {id, login, username, avatar} = action.payload;
            return {
                ...state,
                viewProfile: {id, login, username, avatar}
            }
        }
        case RESET_VIEW_PROFILE: {
            return {
                ...state,
                viewProfile: null
            }
        }
        default:
            return state;
    }
}

export default profileReducer;