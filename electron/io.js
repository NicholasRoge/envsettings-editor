import {showOpenDialog,showSaveDialog} from "electron";


export async function createSettingsCsv(browserWindow) {
    
}

export async function openSettingsCsv(browserWindow) {
    dialog.showOpenDialog(
        browserWindow, 
        ["openFile"],
        selection => {
            if (!selection) {
                return;
            }

            browserWindow.webContents.send("settings:import", {
                filePath: selection[0]
            });
        }
    );
}

export async function saveSettingsCsv(browserWindow, data, asNew = false) {

}