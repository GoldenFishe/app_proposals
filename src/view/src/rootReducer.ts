import {combineReducers} from "redux";

import mainReducer from "./pages/Main/reducer";
import proposalsReducer from "./pages/Proposals/reducer";
import proposalReducer from "./pages/Proposal/reducer";

export const rootReducer = combineReducers(
    {
        main: mainReducer,
        proposals: proposalsReducer,
        proposal: proposalReducer
    }
);

declare global {
    type RootState = ReturnType<typeof rootReducer>;
}