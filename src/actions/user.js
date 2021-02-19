import Swal from 'sweetalert2';
import validator from 'validator';
import { fetchConToken, fetchUpload } from '../helpers/fetch';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';

export const startGetUser = (uid) => {

    return async(dispatch) => {


        const resp = await fetchConToken(`usuarios/${uid}`);
        const data = await resp.json();

        if (data.ok) {
            dispatch(getUser(data.usuario));
        }
    }
}

const getUser = (user) => ({
    type: types.userGet,
    payload: user
})

export const startUpdateUser = (infoUpdate) => {

    return async(dispatch, getState) => {

        dispatch(startLoading());
        const { _id: uid } = getState().user;

        const coypeInfoUpdate = infoUpdate;


        for (const info in coypeInfoUpdate) {
            if (validator.isEmpty(coypeInfoUpdate[info])) {
                delete coypeInfoUpdate[info];
            }
        }

        const resp = await fetchConToken(`usuarios/${uid}`, coypeInfoUpdate, 'PUT');
        const data = await resp.json();

        if (data.ok) {
            dispatch(updateUser(data.usuario));
            Swal.fire('Success', 'Actualización correcta');
            dispatch(finishLoading());
        } else {
            Swal.fire('Error', data.msg, 'error');
            dispatch(finishLoading());
        }
    }
}

const updateUser = (user) => ({
    type: types.userUpdate,
    payload: user
})

export const startUploadFileUser = (file) => {

    return async(dispatch, getState) => {


        dispatch(startLoading());
        const { _id: uid } = getState().user;

        const formData = new FormData();
        formData.append('archivo', file);

        const resp = await fetchUpload(`uploads/usuario/${uid}`, formData);
        const data = await resp.json();

        if (data.ok) {

            dispatch(uploadFileUser(data.usuario, data.img));

            dispatch(finishLoading());
        } else {

            Swal.fire('Error', data.err.message, 'error');
            dispatch(finishLoading());
        }
    }
}

const uploadFileUser = (user, img) => ({
    type: types.userUploadFile,
    payload: {
        user,
        img
    }
})

export const userClean = () => ({ type: types.userClean })