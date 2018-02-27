import {ipcRenderer, remote} from "electron";
import store from "./store";

import {loadStateAction} from "./actions";
import {loadFileAction} from "$app/features/settings";


ipcRenderer.on("sync", (event, action) => {
    if (!action.type) {
        return;
    }

    
    switch (action.type) {
        case "file:open":
            store.dispatch(loadFileAction(action.filePath));
            break;
        
        case "state:save":
            event.returnValue = store.getState();
            debugger;
            break;

        case "state:load":
            store.dispatch(loadStateAction(action.stateData));
            break;
    }
});