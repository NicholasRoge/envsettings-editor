import {ipcRenderer, remote} from "electron";
import store from "./store";

import {loadStateAction} from "./actions";
import {resetSettings, importSettingsFromCsv, exportSettingsToCsv} from "$app/features/settings";


ipcRenderer.on("state:import", (event, data) => {
    store.dispatch(loadStateAction(data.state));
});

ipcRenderer.on("state:export", (event, data) => {
    event.sender.send(
        data.responseChannel,
        {
            state: store.getState()
        }
    );
});


ipcRenderer.on("settings:reset", (event) => {
    resetSettings();
});

ipcRenderer.on("settings:import", (event, filename) => {
    importSettingsFromCsv(filename);
});

ipcRenderer.on("settings:export", (event, filename) => {
    console.log("settings:export " + filename);
    exportSettingsToCsv(filename);
});