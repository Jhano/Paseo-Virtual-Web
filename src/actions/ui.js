import { types } from "../types/types";

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
})

export const removeError = () => ({ type: types.uiRemoveError })

export const openDrawer = () => ({ type: types.uiSetOpenDrawer })

export const closeDrawer = () => ({ type: types.uiSetCloseDrawer })