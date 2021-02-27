import {combineReducers} from "redux";

import mainReducer from "./pages/Main/reducer";

const rootReducer = combineReducers(
    {main: mainReducer}
);

export default rootReducer;