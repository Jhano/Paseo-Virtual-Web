export const types = {

    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start Register',
    authStartStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',

    uiSetError: '[ui] Set Error',
    uiRemoveError: '[ui] Remove Error',
    uiStartLoading: '[ui] Start loading',
    uiFinishLoading: '[ui] Finish loading',
    uiSetOpenDrawer: '[ui] Set open drawer',
    uiSetCloseDrawer: '[ui] Set close drawer',
    uiSetChangePage: '[ui] Set change page',
    uiSetRowsPerPage: '[ui] Set rows per page',
    uiSetChangeDesde: '[ui] Set change desde',
    uiSetChangeDesdeSearch: '[ui] Set change desde search',
    uiSetChangeRowsPerPageSearch: '[ui] Set change rows per page search',
    uiShowPassword: '[ui] Show password',
    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',
    uiSelectedFile: '[ui] Selected file',
    uiSelectedFileFormat: '[ui] Selected file Format',

    userStartGet: '[user] Start get usuario',
    userGet: '[user] Get usuarios',
    userStartUpdate: '[user] Start update usuario',
    userUpdate: '[user] Update usuario',
    userStartUploadFile: '[user] Start upload file',
    userUploadFile: '[user] Upload fifle',
    userClean: '[user] Clean reducer',

    modelStartLoading: '[model] Start loading',
    modelLoading: '[model] Loading',
    modelStartFindById: '[model] Start find by id',
    modelFindById: '[model] Find by id',
    modelStartAdd: '[model] Start add',
    modelAdd: '[model] Add',
    modelStartUpdate: '[model] Start update',
    modelUpdate: '[model] Update',
    modelStartDelete: '[model] Start delete',
    modelDelete: '[model] Delete',
    modelShowMore: '[model] Show more',
    modelSearchOn: '[model] Search models on',
    modelSearchOff: '[model] Search models off',
    modelSearchCopy: '[model] Search copy',
    modelStartUploadFile: '[model] Start upload file',
    modelUploadFile: '[model] Upload file',
    modelUploadFileFormat: '[model] Upload fileFormat',
    modelClearModelFindModal: '[model] Clear modelFind modal',

    mapModelStartLoading: '[map] Model start loading',
    mapModelLoading: '[map] Model loading',
    mapModelStartUpdate: '[map] Model start update',
    mapModelUpdate: '[map] Model update',
    mapShowModelAll: '[map] Show model all',
    mapSelectModel: '[map] Select Model',
    mapSelectLocation: '[map] Select Location',
    mapShowComboBox: '[map] Show combo box',
}