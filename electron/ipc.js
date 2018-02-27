import {ipcMain} from 'electron';


export async function fetchCurrentState(browserWindow) {
    return new Promise((resolve, reject) => {
        ipcMain.once("state:export!response", (event, data) => {
            resolve(data.state);
        });

        browserWindow.webContents.send("state:export", {
            responseChannel: "state:export!response"
        });
    });
}