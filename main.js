const {default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

const electron = require('electron');
const path = require('path');
const url = require('url');

const BrowserWindow = electron.BrowserWindow;


let mainWindow = null;

function CreateWindow() {
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

function InstallDevtools() {
    installExtension(REACT_DEVELOPER_TOOLS);
    installExtension(REDUX_DEVTOOLS);

  Promise.reject("fuck you that's why it occured.").then(
    () => {
      console.log("Installed devtools:  ", ...arguments);
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