const electron = require('electron');

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

                            browserWindow.webContents.send('async', {
                                type: 'file:open',
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
    menuTemplate.push({
        label: "Development",
        submenu: [
            {
                label: "Toggle Dev Tools",
                //accelerator: process.platform === "darwin" ? "Cmd+Option+I" : "Ctrl+Shift+I",
                role: "toggledevtools"
            }
        ]
    });
}

module.exports = menuTemplate;