import { types } from "../types/types";

const initialState = {
    models: [],
    cuantos: 0,
    search: false,
    showMore: false
}

export const modelReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.modelLoading:
            return {
                models: action.payload.models,
                cuantos: action.payload.cuantos
            }

        case types.modelSearchOn:
            return {
                ...state,
                models: action.payload.models,
                cuantos: action.payload.cuantos,
                search: true
            }
        case types.modelSearchOff:
            return {
                ...state,
                search: false
            }

        case types.modelDelete:
            return {
                ...state,
                models: state.models.filter(model => model.id !== action.payload._id),
            }

        default:
            return state;
    }
}