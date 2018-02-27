import {ipcRenderer, remote} from "electron";
import store from "./store";

import {loadStateAction} from "./actions";
import {loadFileAction} from "$app/features/settings";


ipcRenderer.on("file:open", (event, data) => {
    store.dispatch(loadFileAction(data.fileName));
});

ipcRenderer.on("state:export", (event, data) => {
    event.sender.send(
        data.responseChannel,
        {
            state: store.getState()
        }
    );
});

ipcRenderer.on("state:import", (event, data) => {
    store.dispatch(loadStateAction(data.state));
});