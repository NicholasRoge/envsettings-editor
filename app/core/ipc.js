import {ipcRenderer, remote} from "electron";
import store from "./store";

import {loadFileAction} from "$app/features/settings";


ipcRenderer.on("async", (event, action) => {
    if (!action.type) {
        return;
    }

    
    switch (action.type) {
        case "file:open":
            store.dispatch(loadFileAction(action.filePath));
            break;
    }
});