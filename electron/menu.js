const electron = require('electron');
const fs = require('fs');

import {fetchCurrentState} from "./ipc";

const {app, dialog, BrowserWindow, Menu} = electron;


const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Open",
                accelerator: "CmdOrCtrl+O",
                click(menuItem, browserWindow) {
                    dialog.showOpenDialog(
                        browserWindow, 
                        ['openFile'],
                        selection => {
                            if (!selection) {
                                return;
                            }

                            browserWindow.webContents.send('file:open', {
                                filePath: selection[0]
                            });
                        }
                    )
                }
            },
            {
                label: "Quit",
                accelerator: "CmdOrCtrl+Q",
                click() {
                    app.quit()
                }
            }
        ]
    }
];

if (process.env.NODE_ENV === 'development') {
    let quickSaveStates = {};

    menuTemplate.push({
        label: "Development",
        submenu: [
            {
                label: "Toggle Dev Tools",
                role: "toggledevtools"
            },
            {
                label: "Save State",
                accelerator: "Cmd+Option+S",
                click(menuItem, browserWindow) {
                    fetchCurrentState(browserWindow).then(
                        state => {
                            dialog.showSaveDialog(
                                browserWindow, 
                                {
                                    extensions: ['json']
                                }, 
                                selection => {
                                    if (!selection) {
                                        return;
                                    }


                                    fs.writeFile(selection, JSON.stringify(state));
                                }
                            );
                        },
                        e => {
                            console.error("Failed to fetch state due to rejected promise.", e);
                        }
                    );
                }
            },
            {
                label: "Load State",
                accelerator: "Cmd+Option+L",
                click(menuItem, browserWindow) {
                    dialog.showOpenDialog(
                        browserWindow,
                        {
                            extensions: ['json']
                        },
                        selection => {
                            if (!selection) {
                                return;
                            }


                            let state = fs.readFileSync(selection[0]);
                            state = JSON.parse(state.toString());
                            browserWindow.webContents.send('state:import', {
                                state
                            });
                        }
                    )
                }
            }
        ]
    });
}

module.exports = menuTemplate;