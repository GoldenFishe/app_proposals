import {combineReducers} from "redux";

import mainReducer from "./pages/Main/reducer";
import proposalsReducer from "./pages/Proposals/reducer";
import proposalReducer from "./pages/Proposal/reducer";
import profileReducer from "./pages/Profile/reducer";

export const rootReducer = combineReducers({
    main: mainReducer,
    proposals: proposalsReducer,
    proposal: proposalReducer,
    profile: profileReducer
});

declare global {
    type RootState = ReturnType<typeof rootReducer>;
}