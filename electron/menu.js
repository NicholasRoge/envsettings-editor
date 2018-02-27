const electron = require('electron');
const fs = require('fs');

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

                            browserWindow.webContents.sendSync('file:open', {
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
                    const stateData = browserWindow.webContents.send('state:save');
                    console.log(stateData);

                    dialog.showSaveDialog(
                        browserWindow, 
                        {
                            extensions: ['json']
                        }, 
                        selection => {
                            if (!selection) {
                                return;
                            }


                            fs.writeFile(selection, JSON.stringify(stateData));
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


                            let stateData = fs.readFileSync(selection[0]);
                            stateData = JSON.parse(stateData.toString());
                            browserWindow.webContents.send('state:load', {
                                stateData
                            });
                        }
                    )
                }
            }
        ]
    });
}

module.exports = menuTemplate;