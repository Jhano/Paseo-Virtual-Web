import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { startLoadingModels } from "./model";

//comenzar a actualizar el modelo
export const mapStartUpdateModel = (mid, location) => {
    return async(dispatch) => {

        const resp = await fetchConToken(`modelos/${mid}`, location, 'PUT');
        const data = await resp.json();

        if (data.ok) {
            dispatch(mapUpdateModel(data.modelo));
            dispatch(startLoadingModels());
            Swal.fire('Success', 'Marcador actualizado');
        } else {
            Swal.fire('No se ha eliminar el marcador', data.err, 'error');
            console.log(data.err)
        }
    }
};

const mapUpdateModel = (model) => ({
    type: types.mapModelUpdate,
    payload: model
});

export const showAllModel = () => ({ type: types.mapShowModelAll });

export const mapSelectModel = (mId = '', modelName = '') => ({
    type: types.mapSelectModel,
    payload: {
        mId,
        modelName
    }
});

export const mapSelectLocation = (lat, lng) => ({
    type: types.mapSelectLocation,
    payload: {
        lat,
        lng
    }
});

export const mapShowComboBox = (flag) => ({
    type: types.mapShowComboBox,
    payload: flag
});