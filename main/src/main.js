import electron from 'electron';
import path from 'path';
import url from 'url';

import installExtension from 'electron-devtools-installer';
import {Menu, BrowserWindow} from 'electron';

import appMenuTemplate from './menu';
import {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer';


let mainWindow = null;

function CreateWindow() {
  let appMenu = Menu.buildFromTemplate(appMenuTemplate);
  Menu.setApplicationMenu(appMenu);

  mainWindow = new BrowserWindow({
    width: 1600, 
    height: 1200
  });

  mainWindow.openDevTools();

  mainWindow.loadURL(url.format({
    pathname: path.resolve(__dirname, "index.html"),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.setTitle("Env Settings Editor");

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function InstallDevtools() {
  var extensionInstallPromises = [
    installExtension(REACT_DEVELOPER_TOOLS),
    installExtension(REDUX_DEVTOOLS)
  ];

  Promise.all(extensionInstallPromises).then(
    () => {
      console.log("Installed devtools.");
    },
    (e) => {
      console.error("Promise rejected:  ", e);
    }
  ).catch((error) => {
      console.error("An error occurred:  ", error)
  });
}


const app = electron.app;

app.on('ready', CreateWindow);
app.on('ready', InstallDevtools);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    CreateWindow();
  }
});