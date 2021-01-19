import { types } from "../types/types";




const initialState = {};

export const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.userGet:

            return {
                ...state,
                ...action.payload
            }

        case types.userUpdate:

            return {
                ...state,
                ...action.payload
            }

        case types.userUploadFile:

            return {
                ...state,
                img: action.payload.img
            }
        case types.userClean:

            return {}

        default:
            return state;
    }
}