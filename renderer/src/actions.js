export const Types = {
    IMPORT_STATE: 'ese/import',
    RESET_STATE: 'ese/reset',

    ACTIVATE_ENVIRONMENT: 'ese/environment/activate',
    CREATE_ENVIRONMENT: 'ese/environment/create',

    ACTIVATE_HANDLER: 'ese/handler/activate',
    CREATE_HANDLER: 'ese/handler/create',
    
    CREATE_SETTING: 'ese/setting/create',

    UPDATE_SETTING_VALUE: 'ese/setting_value/update'
}


export const importStateAction = state => ({
    type: Types.IMPORT_STATE,
    payload: state
})

export const resetStateAction = state => ({
    type: Types.RESET_STATE,
    payload: null
})

export const activateEnvironmentAction = (environment) => ({
    type: Types.ACTIVATE_ENVIRONMENT,
    payload: environment
})

export const createEnvironmentAction = (environmentData) => ({
    type: Types.CREATE_ENVIRONMENT,
    payload: environmentData
})

export const activateHandlerAction = (handler) => ({
    type: Types.ACTIVATE_HANDLER,
    payload: handler
})

export const createHandlerAction = (handlerData) => ({
    type: Types.CREATE_HANDLER,
    payload: handlerData
})

export const createSettingAction = (settingData) => ({
    type: Types.CREATE_SETTING,
    payload: settingData
})

export const updateSettingValueAction = (settingValueData) => ({
    type: Types.UPDATE_SETTING_VALUE,
    payload: settingValueData
})