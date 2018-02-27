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
    const quickSaveStates = {};

    menuTemplate.push({
        label: "Development",
        submenu: [
            {
                label: "Toggle Dev Tools",
                role: "toggledevtools"
            },
            {
                type: "separator",
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
            },
            {
                label: "Quick Save State",
                submenu: [
                    {
                        label: "Slot 1",
                        accelerator: "Shift+F9",
                        click(menuItem, browserWindow) {
                            fetchCurrentState(browserWindow).then(
                                state => {
                                    quickSaveStates[0] = state;

                                    const menuItem = Menu.getApplicationMenu().getMenuItemById("quick_load_0");
                                    menuItem.enabled = true;
                                },
                                e => {
                                    console.error("Failed to fetch state due to rejected promise.", e);
                                }
                            );
                        }
                    },
                    {
                        label: "Slot 2",
                        accelerator: "Shift+F10",
                        click(menuItem, browserWindow) {
                            fetchCurrentState(browserWindow).then(
                                state => {
                                    quickSaveStates[1] = state;

                                    const menuItem = Menu.getApplicationMenu().getMenuItemById("quick_load_1");
                                    menuItem.enabled = true;
                                },
                                e => {
                                    console.error("Failed to fetch state due to rejected promise.", e);
                                }
                            );
                        }
                    },
                    {
                        label: "Slot 3",
                        accelerator: "Shift+F11",
                        click(menuItem, browserWindow) {
                            fetchCurrentState(browserWindow).then(
                                state => {
                                    quickSaveStates[2] = state;

                                    const menuItem = Menu.getApplicationMenu().getMenuItemById("quick_load_2");
                                    menuItem.enabled = true;
                                },
                                e => {
                                    console.error("Failed to fetch state due to rejected promise.", e);
                                }
                            );
                        }
                    },
                    {
                        label: "Slot 4",
                        accelerator: "Shift+F12",
                        click(menuItem, browserWindow) {
                            fetchCurrentState(browserWindow).then(
                                state => {
                                    quickSaveStates[3] = state;

                                    const menuItem = Menu.getApplicationMenu().getMenuItemById("quick_load_3");
                                    menuItem.enabled = true;
                                },
                                e => {
                                    console.error("Failed to fetch state due to rejected promise.", e);
                                }
                            );
                        }
                    }
                ]
            },
            {
                label: "Quick Load State",
                submenu: [
                    {
                        id: "quick_load_0",
                        label: "Slot 1",
                        accelerator: "F9",
                        enabled: false,
                        click(menuItem, browserWindow) {
                            browserWindow.webContents.send('state:import', {
                                state: quickSaveStates[0]
                            });
                        }
                    },
                    {
                        id: "quick_load_1",
                        label: "Slot 2",
                        accelerator: "F10",
                        enabled: false,
                        click(menuItem, browserWindow) {
                            browserWindow.webContents.send('state:import', {
                                state: quickSaveStates[1]
                            });
                        }
                    },
                    {
                        id: "quick_load_2",
                        label: "Slot 3",
                        accelerator: "F11",
                        enabled: false,
                        click(menuItem, browserWindow) {
                            browserWindow.webContents.send('state:import', {
                                state: quickSaveStates[2]
                            });
                        }
                    },
                    {
                        id: "quick_load_3",
                        label: "Slot 4",
                        accelerator: "F12",
                        enabled: false,
                        click(menuItem, browserWindow) {
                            browserWindow.webContents.send('state:import', {
                                state: quickSaveStates[3]
                            });
                        }
                    }
                ]
            }
        ]
    });
}

module.exports = menuTemplate;