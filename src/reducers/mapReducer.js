import { types } from "../types/types";


const initialState = {
    modelUpdate: {},
    selectModel: {
        mId: '',
        modelName: ''
    },
    visible: false,
    selectLocation: {
        lat: 0,
        lng: 0
    },
    showComboBox: false,
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

        case types.mapSelectLocation:
            return {
                ...state,
                selectLocation: {
                    lat: action.payload.lat,
                    lng: action.payload.lng
                }
            }
        case types.mapShowComboBox:
            return {
                ...state,
                showComboBox: action.payload
            }

        default:
            return state;
    }
}