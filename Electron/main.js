const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong');
  createWindow(); // ✅ use the function

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(); // ✅ now defined
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("minimize", () => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on("maximize", () => {
  const win = BrowserWindow.getFocusedWindow();
  win.isMaximized() ? win.restore() : win.maximize();
});

ipcMain.on("close", () => {
  BrowserWindow.getFocusedWindow().close();
});