import { types } from "../types/types";

const initialState = {
    validatedError: false,
    openDrawer: true,
    msgError: '',
    loading: false,
    page: 0,
    rowsPerPage: 5,
    desde: 0,
    desdeSearch: 0,
    rowsPerPageSearch: 5,
    showPassword: false,
    activeModal: false,
    selectedFile: ''

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
        case types.uiSetChangePage:
            return {
                ...state,
                page: action.payload
            }
        case types.uiSetRowsPerPage:
            return {
                ...state,
                rowsPerPage: action.payload
            }
        case types.uiSetChangeDesde:
            return {
                ...state,
                desde: action.payload
            }
        case types.uiShowPassword:
            return {
                ...state,
                showPassword: action.payload
            }
        case types.uiSetChangeDesdeSearch:
            return {
                ...state,
                desdeSearch: action.payload
            }
        case types.uiSetChangeRowsPerPageSearch:
            return {
                ...state,
                rowsPerPageSearch: action.payload
            }
        case types.uiOpenModal:
            return {
                ...state,
                activeModal: true
            }
        case types.uiCloseModal:
            return {
                ...state,
                activeModal: false
            }
        case types.uiSelectedFile:
            return {
                ...state,
                selectedFile: action.payload
            }


        default:
            return state;
    }
}