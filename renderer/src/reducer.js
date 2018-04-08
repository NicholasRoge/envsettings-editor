import {Types as ActionTypes} from './actions'

import {mutate} from './util'
import {selectAllEnvironments, selectAllSettings, selectNextSettingId, selectAllSettingValues} from './selectors'


const defaultInitialState = {
    activeEnvironment: null,
    activeHandler: null,
    
    entities: {
        environments: [],
        handlers: [],
        settings: [],
        settingValues: []
    }
}


export default function reducer(state, action) {
    if (state === undefined) {
        state = defaultInitialState
    }

    switch (action.type) {
        case ActionTypes.IMPORT_STATE:
            state = action.payload
            break

        case ActionTypes.RESET_STATE:
            state = defaultInitialState
            break

        case ActionTypes.ACTIVATE_ENVIRONMENT:
            state = mutate(state, 'activeEnvironment', action.payload)
            break

        case ActionTypes.CREATE_ENVIRONMENT:
            // TODO:  Ensure another environment with the same name doesn't
            // already exist?
            state = mutate(state, 'entities.environments', [
                ...selectAllEnvironments(state),
                action.payload
            ])
            state = mutate(state, 'entities.settingValues', [
                ...selectAllSettingValues(state),
                ...selectAllSettings(state).map(setting => ({
                    setting: setting.id,
                    environment: action.payload.name,

                    text: '',
                    isDefault: action.payload.name != 'DEFAULT'
                }))
            ])

            break

        case ActionTypes.ACTIVATE_HANDLER:
            state = mutate(state, 'activeHandler', action.payload)
            break

        case ActionTypes.CREATE_HANDLER:
            state = mutate(state, 'entities.handlers', [
                ...selectAllHandlers(state),
                action.payload
            ])
            break

        case ActionTypes.CREATE_SETTING:
            if (!action.payload.id) {
                action.payload.id = selectNextSettingId(state)
            }
            state = mutate(state, 'entities.settings', [
                ...selectAllSettings(state),
                action.payload
            ])
            state = mutate(state, 'entities.settingValues', [
                ...selectAllSettingValues(state),
                ...selectAllEnvironments(state).map(environment => ({
                    setting: action.payload.id,
                    environment: environment.name,

                    text: '',
                    isDefault: environment.name != 'DEFAULT'
                }))
            ])
            break

        case ActionTypes.UPDATE_SETTING_VALUE:
            state = mutate(state, 'entities.settingValues', settingValues => {
                const targetIndex = settingValues.findIndex(settingValue => settingValue.setting == action.payload.setting && settingValue.environment == action.payload.environment)
                if (targetIndex === -1) {
                    return settingValues
                }


                settingValues[targetIndex] = {
                    ...settingValues[targetIndex],
                    ...action.payload
                }
                return [
                    ...settingValues
                ]
            })
            break
    }

    return state
}