import {combineReducers} from "redux";

import mainReducer from "./pages/Main/reducer";
import {proposalsReducer} from "./pages/Proposals";

export const rootReducer = combineReducers(
    {
        main: mainReducer,
        proposals: proposalsReducer
    }
);

export type RootState = ReturnType<typeof rootReducer>;