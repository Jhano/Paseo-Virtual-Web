import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import { userClean } from './user';





export const startLogin = (email, password) => {

    return async(dispatch) => {

        dispatch(startLoading());

        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const data = await resp.json();


        if (data.ok && data.role === 'ADMIN_ROLE') {
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: data.uid,
                name: data.name,
                role: data.role
            }))
            dispatch(finishLoading());
        } else if (data.ok && data.role !== 'ADMIN_ROLE') {
            Swal.fire('Error', 'Esta cuenta no cuenta con los permisos para ingresar', 'error');
            dispatch(finishLoading());
        } else {
            Swal.fire('Error', data.msg, 'error');
            dispatch(finishLoading());
        }



    }
}

export const startChecking = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('auth/renew');
            const data = await resp.json();



            if (data.ok && data.role === 'ADMIN_ROLE') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());


                dispatch(login({
                    uid: data.uid,
                    name: data.name,
                    role: data.role
                }))
            } else if (data.ok && data.role !== 'ADMIN_ROLE') {
                Swal.fire('Error', 'Esta cuenta no cuenta con los permisos para ingresar', 'error');
                dispatch(finishLoading());
            } else {
                console.log(data.msg);
                dispatch(checkingFinish());
            }
        } catch (error) {
            console.log(error);
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = (user) => ({

    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();
        dispatch(userClean())
        dispatch(logout());
    }
}


const logout = () => ({ type: types.authLogout })