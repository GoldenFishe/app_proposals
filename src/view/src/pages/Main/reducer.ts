import {MainActionTypes, MainState} from "./types";
import {GET_TAGS, ADD_NOTIFICATION, REMOVE_NOTIFICATION} from "./actionTypes";

const initialState: MainState = {
    tags: [],
    notifications: []
}

const mainReducer = (state = initialState, action: MainActionTypes): MainState => {
    switch (action.type) {
        case GET_TAGS: {
            return {
                ...state,
                tags: action.payload
            }
        }
        case ADD_NOTIFICATION: {
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            }
        }
        case REMOVE_NOTIFICATION: {
            const notificationsClone = Array.from(state.notifications);
            const notificationIndex = notificationsClone.findIndex(notification => notification.id === action.payload);
            notificationsClone.splice(notificationIndex, 1);
            return {
                ...state,
                notifications: notificationsClone
            }
        }
        default:
            return state;
    }
}

export default mainReducer;