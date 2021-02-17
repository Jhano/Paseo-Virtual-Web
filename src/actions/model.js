import Swal from "sweetalert2";
import validator from "validator";
import { fetchConToken, fetchUpload } from "../helpers/fetch";
import { types } from "../types/types";
import { finishLoading, openModal, selectedFileModel, startLoading } from "./ui";


//comienza a hacer la peticion para cargar los modelos
export const startLoadingModels = (desde = 0, limite = 0) => {
    return async(dispatch) => {


        const resp = await fetchConToken(`modelos?desde=${desde}&limite=${limite}`);
        const data = await resp.json();


        if (data.ok) {
            dispatch(loadingModels(data.modelos, data.cuantos))
        } else {
            console.log(data.err)
        }
    }
}

//carga los modelos
const loadingModels = (models, cuantos) => ({
    type: types.modelLoading,
    payload: {
        models,
        cuantos
    }
})

//comienza a hacer la peticion para eliminar un modelo
export const startDeleteModel = (id) => {
    return async(dispatch) => {


        const resp = await fetchConToken(`modelos/${id}`, '', 'DELETE');
        const data = await resp.json();

        if (data.ok) {
            dispatch(deleteModel(data.modelo))
        } else {
            console.log(data.err)
        }
    }
}

//Elimina el modelo de la tabla
const deleteModel = (model) => ({
    type: types.modelDelete,
    payload: model
})

//Comienza a hacer la paticion para buscar modelos
export const startSearchModels = (termino, searchDesde, searchLimite) => {
    return async(dispatch) => {

        const resp = await fetchConToken(`modelos/buscar/${termino}?desde=${searchDesde}&limite=${searchLimite}`);
        const data = await resp.json();

        if (data.ok) {
            dispatch(searchModelsOn(data.modelos, data.cuantos));
        } else {
            console.log(data.err)
        }
    }
}


//Carga los modelos encontrados
const searchModelsOn = (models, cuantos) => ({
    type: types.modelSearchOn,
    payload: {
        models,
        cuantos
    }
})

export const searchModelsOff = () => ({
    type: types.modelSearchOff,
})

//comenzar a agregar un modelo
export const startAddModel = (dataAdd, file) => {
    return async(dispatch) => {

        const coypdata = dataAdd;


        for (const object in coypdata) {
            if (validator.isEmpty(coypdata[object])) {
                delete coypdata[object];
            }
        }

        const resp = await fetchConToken(`modelos/new`, coypdata, 'POST');
        const data = await resp.json();

        if (data.ok) {
            dispatch(addModel(data.modelo));
            dispatch(startUploadFileModel(data.modelo._id, file));
            dispatch(startLoadingModels(0, 5));
            Swal.fire('Success', 'Modelo agregado Correctamente');
        } else {
            Swal.fire('No se ha podido agregar un nuevo modelo', data.err, 'error');
            console.log(data.err)
        }
    }
}
const addModel = (model) => ({
    type: types.modelAdd,
    payload: model
})

//comenzar a actualizar el modelo
export const startUpdateModel = (id, dataAdd, file = '') => {
    return async(dispatch) => {

        const coypdata = dataAdd;

        for (const object in coypdata) {
            if (validator.isEmpty(coypdata[object])  ) {
                delete coypdata[object];
            }
        }



        const resp = await fetchConToken(`modelos/${id}`, coypdata, 'PUT');
        const data = await resp.json();

        if (data.ok) {
            dispatch(updateModel(data.modelo));
            dispatch(startFindModel(id));
            dispatch(startLoadingModels(0, 5));
            if (file !== '') {
                dispatch(startUploadFileModel(data.modelo._id, file));
            }
            Swal.fire('Success', 'Modelo actualizado Correctamente');
        } else {
            Swal.fire('No se ha podido actualizar el modelo', data.err, 'error');
            console.log(data.err)
        }
    }
}
const updateModel = (model) => ({
    type: types.modelUpdate,
    payload: model
})

//comenzar a subir un archivo a un modelo
export const startUploadFileModel = (id, file) => {

    return async(dispatch) => {


        dispatch(startLoading());

        const formData = new FormData();
        formData.append('archivo', file);

        const resp = await fetchUpload(`uploads/modelo/${id}`, formData);
        const data = await resp.json();

        if (data.ok) {

            dispatch(uploadFileModel(data.modelo, data.fileModel));
            dispatch(finishLoading());
            dispatch(selectedFileModel(''));
            dispatch(startFindModel(id));
        } else {

            Swal.fire('Error', data.err.message, 'error');
            dispatch(finishLoading());
        }
    }
}

const uploadFileModel = (model, file) => ({
    type: types.modelUploadFile,
    payload: {
        model,
        file
    }
})

export const startFindModel = (id, modal = false) => {

    return async(dispatch) => {


        const resp = await fetchConToken(`modelos/${id}`);
        const data = await resp.json();

        if (data.ok) {
            if (modal) {
                dispatch(findModel(data.modelo));
                dispatch(openModal());
            } else {
                dispatch(findModel(data.modelo));
            }
            dispatch(findModel(data.modelo));
            if (data.modelo?.fileModel) {
                dispatch(selectedFileModel(''));
            }
        } else {
            Swal.fire('Error', data.err.message, 'error');

        }
    }
}

const findModel = (model) => ({
    type: types.modelFindById,
    payload: model

})

export const clearModelFind = () => ({
    type: types.modelClearModelFindModal,
    payload: undefined

})