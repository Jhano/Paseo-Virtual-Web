import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";
import { userReducer } from "./userReducer";
import { modelReducer } from "./modelReducer";



export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    model: modelReducer
})