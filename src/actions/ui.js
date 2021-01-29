import { types } from "../types/types";

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
})

export const removeError = () => ({ type: types.uiRemoveError });

export const openDrawer = () => ({ type: types.uiSetOpenDrawer });

export const closeDrawer = () => ({ type: types.uiSetCloseDrawer });

export const startLoading = () => ({ type: types.uiStartLoading });

export const finishLoading = () => ({ type: types.uiFinishLoading });

export const setShowPassword = (value) => ({ type: types.uiShowPassword, payload: value });

export const changePage = (newPage) => ({
    type: types.uiSetChangePage,
    payload: newPage
});

export const changeRowsPerPage = (rowsPerPage) => ({
    type: types.uiSetRowsPerPage,
    payload: rowsPerPage
});

export const changeDesde = (desde) => ({
    type: types.uiSetChangeDesde,
    payload: desde
});

export const changeRowsPerPageSearch = (rowsPerPageSearch) => ({
    type: types.uiSetChangeRowsPerPageSearch,
    payload: rowsPerPageSearch
});

export const changeDesdeSearch = (desdeSearch) => ({
    type: types.uiSetChangeDesdeSearch,
    payload: desdeSearch
});

export const openModal = () => ({ type: types.uiOpenModal });

export const closeModal = () => ({ type: types.uiCloseModal });

export const selectedFileModel = (file) => ({
    type: types.uiSelectedFile,
    payload: file
});