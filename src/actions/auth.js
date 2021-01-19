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


        if (data.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: data.uid,
                name: data.name,
                img: data.img
            }))
            dispatch(finishLoading());
        } else {
            Swal.fire('Error', data.msg, 'error');
            dispatch(finishLoading());
        }



    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const data = await resp.json();



        if (data.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());


            dispatch(login({
                uid: data.uid,
                name: data.name,
                img: data.img
            }))
        } else {
            console.log(data.msg);
            dispatch(checkingFinish());
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