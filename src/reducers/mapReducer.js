import { types } from "../types/types";


const initialState = {
    modelUpdate: {},
    selectModel: {
        mId: '',
        modelName: ''
    },
    visible: false
}

export const mapReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.mapModelUpdate:
            return {
                ...state,
                modelUpdate: action.payload
            }
        case types.mapSelectModel:
            return {
                ...state,
                selectModel: {
                    mId: action.payload.mId,
                    modelName: action.payload.modelName
                }
            }
        case types.mapShowModelAll:
            return {
                ...state,
                visible: !state.visible
            }

        default:
            return state;
    }
}