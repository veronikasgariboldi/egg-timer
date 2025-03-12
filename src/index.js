const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 530,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  //mainWindow.webContents.openDevTools(); // Open Developer Tools

  ipcMain.on('navigate', (event, filePath) => {
    if (mainWindow) {
      const fullPath = path.join(__dirname, filePath);
      console.log("Loading file:", fullPath);
      mainWindow.loadFile(fullPath).catch(err => console.error("Failed to load file:", err));
    }
  });

  // Ensure the content inside the window doesn't zoom unexpectedly
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setZoomFactor(0.85); 
});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


ipcMain.on('navigate-to', (event, page) => {
  const mainWindow = BrowserWindow.getFocusedWindow();
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, page));
  }
});

ipcMain.on('window-control', (event, command) => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    if (command === 'minimize') {
      window.minimize();
    } else if (command === 'close') {
      window.close();
    }
  }
});

ipcMain.on('window-control', (event, action) => {
  if (action === 'quit') {
    app.quit(); // Quit the application
  } else if (action === 'close') {
    BrowserWindow.getFocusedWindow().close(); // Close the window
  }
});