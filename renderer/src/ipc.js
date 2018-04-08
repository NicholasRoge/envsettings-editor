import {ipcRenderer, remote} from "electron";

import store from "./store";

import {importStateAction, resetStateAction, createEnvironmentAction, createSettingAction, updateSettingValueAction} from "./actions";
import {selectNextSettingId, selectEnvironment, selectAllEnvironments, selectAllSettings, selectSettingValue} from './selectors'


ipcRenderer.on("state:import", (event, data) => {
    store.dispatch(importStateAction(data.state));
});

ipcRenderer.on("state:export", (event, data) => {
    event.sender.send(
        data.responseChannel,
        {
            state: store.getState()
        }
    );
});

ipcRenderer.on("state:reset", (event) => {
    store.dispatch(resetStateAction)
});


ipcRenderer.on("settings:import", (event, data) => {
    for (const environment of data.environments) {
        if (selectEnvironment(store.getState(), environment) !== null) {
            continue
        }

        store.dispatch(createEnvironmentAction({name: environment}))
    }

    for (const setting of data.settings) {
        const settingId = selectNextSettingId(store.getState())
        store.dispatch(createSettingAction({
            id: settingId,
            handler: setting.handler,
            params: setting.params,
            groups: setting.groups
        }))

        for (const environment in setting.values) {
            const value = setting.values[environment]
            store.dispatch(updateSettingValueAction({
                environment,
                setting: settingId,

                text: value === '--empty--' ? '' : value,
                isDefault: environment !== 'DEFAULT' && value === ''
            }))
        }
    }
});

ipcRenderer.on("settings:export", (event, data) => {
    const environments = selectAllEnvironments(store.getState()).map(environment => environment.name)
    const settings = selectAllSettings(store.getState()).map(setting => {
        const values = {}
        for (const environment of environments) {
            const settingValue = selectSettingValue(store.getState(), setting.id, environment)
            if (settingValue.isDefault) {
                values[environment] = ''
            } else if (settingValue.text === '') {
                values[environment] = '--empty--'
            } else {
                values[environment] = settingValue.text
            }
        }
        return {
            ...setting,
            values
        }
    })
    console.log(settings)

    event.sender.send(
        data.responseChannel,
        {environments, settings}
    )
});