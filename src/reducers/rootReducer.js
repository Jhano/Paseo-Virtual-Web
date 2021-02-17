import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";
import { userReducer } from "./userReducer";
import { modelReducer } from "./modelReducer";
import { mapReducer } from "./mapReducer";



export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    model: modelReducer,
    map: mapReducer
})