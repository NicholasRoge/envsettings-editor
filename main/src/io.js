import {dialog, ipcMain} from "electron";

import {read, write} from './file'


export async function openSettingsCsv(browserWindow) {
    dialog.showOpenDialog(
        browserWindow, 
        {
            defaultPath: process.cwd(),
            properties: ['openFile'],
            filters: [
                {name: 'CSVs', extensions: ['csv']},
                {name: 'All Files', extensions: '*'}
            ]
        },
        selection => {
            if (!selection) {
                return;
            }

            read(selection[0]).then(data => browserWindow.webContents.send("settings:import", data))
        }
    )
}

export async function saveSettingsCsv(browserWindow) {
    dialog.showSaveDialog(
        browserWindow,
        {
            defaultPath: process.cwd(),
            properties: ['saveFile'],
            filters: [
                {name: 'CSVs', extensions: ['csv']},
                {name: 'All Files', extensions: '*'}
            ]
        },
        selection => {
            if (!selection) {
                return
            }

            ipcMain.once('settings:export!response', (event, data) => write(selection, data))
            browserWindow.webContents.send("settings:export", {
                responseChannel: 'settings:export!response'
            })
        }
    )
}