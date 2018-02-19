const electron = require('electron');
const path = require('path');
const url = require('url');

const BrowserWindow = electron.BrowserWindow;


let mainWindow = null;

function CreateWindow () {
  mainWindow = new BrowserWindow({
    width: 1056, 
    height: 792
  });
  mainWindow.setResizable(false);

  mainWindow.loadURL(url.format({
    pathname: path.resolve(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}


const app = electron.app;

app.on('ready', CreateWindow);

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