import { types } from "../types/types";

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
})

export const removeError = () => ({ type: types.uiRemoveError });

export const openDrawer = () => ({ type: types.uiSetOpenDrawer });

export const closeDrawer = () => ({ type: types.uiSetCloseDrawer });

export const startLoading = () => ({ type: types.uiStartLoading })

export const finishLoading = () => ({ type: types.uiFinishLoading })