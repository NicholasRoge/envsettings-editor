import {ipcRenderer, remote} from "electron";
import store from "./store";

import {loadStateAction} from "./actions";
import {loadFileAction} from "$app/features/settings";


ipcRenderer.on("file:open", (event, data) => {
    store.dispatch(loadFileAction(data.fileName));
});

ipcRenderer.on("state:save", (event) => {
    event.returnValue = store.getState();
});

ipcRenderer.on("state:load", (event, data) => {
    store.dispatch(loadStateAction(action.stateData));
});