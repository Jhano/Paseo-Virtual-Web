import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";


//comienza a hacer la peticion para cargar los modelos
export const startLoadingModels = (desde, limite) => {
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

        console.log(data.modelo);


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