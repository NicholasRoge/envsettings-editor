import {createSelector} from 'reselect'


export const selectAllEnvironments = state => state.entities.environments


export const selectEnvironment = (state, environmentName) => createSelector(
    selectAllEnvironments,
    environments => {
        const filteredEnvironments = environments.filter(environment => environment.name == environmentName)
        return filteredEnvironments.length === 0 ? null : filteredEnvironments[0]
    }
)(state)

export const selectActiveEnvironment = state => selectEnvironment(state, state.activeEnvironment)


export const selectAllHandlers = state => state.entities.handlers

export const selectHandler = (state, handlerType) => createSelector(
    selectAllHandlers,
    handlers => {
        const filteredHandlers = handlers.filter(handler => handler.type == handlerType)
        return filteredHandlers.length === 0 ? null : filteredHandlers[0]
    }
)(state)

export const selectActiveHandler = state => selectHandler(state, state.activeHandler)


export const selectAllSettings = state => state.entities.settings

export const selectSetting = (state, settingId) => createSelector(
    selectAllSettings,
    settings => {
        const filteredSettings = settings.filter(setting => setting.id == settingId)
        return filteredSettings.length === 0 ? null : filteredSettings[0]
    }
)(state)

export const selectNextSettingId = state => createSelector(
    selectAllSettings,
    settings => settings.length + 1
)(state)


export const selectAllSettingValues = state => state.entities.settingValues

export const selectSettingValues = (state, setting) => createSelector(
    selectAllSettingValues,

    settingValues => settingValues.filter(settingValue => settingValue.setting == setting)
)(store)

export const selectSettingValue = (state, setting, environment) => createSelector(
    selectAllSettingValues,
    settingValues => {
        const filteredSettingValues = settingValues.filter(settingValue =>  settingValue.setting == setting && settingValue.environment == environment)
        return filteredSettingValues.length === 0 ? null : filteredSettingValues[0]
    }
)(state)