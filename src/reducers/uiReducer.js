import { types } from "../types/types";

const initialState = {
    validatedError: false,
    openDrawer: true,
    msgError: '',
    loading: false,
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload,
                validatedError: true
            }

        case types.uiRemoveError:
            return {
                ...state,
                msgError: null,
                validatedError: false
            }

        case types.uiSetOpenDrawer:
            return {
                ...state,
                openDrawer: true
            }

        case types.uiSetCloseDrawer:
            return {
                ...state,
                openDrawer: false
            }

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }


        default:
            return state;
    }
}