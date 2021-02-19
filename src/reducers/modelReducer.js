import { types } from "../types/types";

const initialState = {
    models: [],
    cuantos: 0,
    search: false,
    showMore: false,
    file: null,
    fileFormat: null,
    modelUpdate: {},
    searchCopy: ''
        //modelfind
}

export const modelReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.modelLoading:
            return {
                ...state,
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

        case types.modelAdd:
            return {
                ...state,
                models: [
                    action.payload,
                    ...state.models
                ],
            }
        case types.modelUpdate:
            return {
                ...state,
                modelUpdate: action.payload,
            }
        case types.modelUploadFile:
            return {
                ...state,
                modelUpdate: action.payload.model,
                file: action.payload.file
            }
        case types.modelUploadFileFormat:
            return {
                ...state,
                modelUpdate: action.payload.model,
                fileFormat: action.payload.fileFormat
            }
        case types.modelFindById:
            return {
                ...state,
                modelFind: action.payload
            }
        case types.modelClearModelFindModal:
            return {
                ...state,
                modelFind: action.payload
            }
        case types.modelSearchCopy:
            return {
                ...state,
                searchCopy: action.payload
            }



        default:
            return state;
    }
}