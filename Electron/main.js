const { app, BrowserWindow,ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
        },
    });

    
    
    // Open window if none are open
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    mainWindow.setMenu(null);
    // Load Vite React frontend
    mainWindow.loadURL("http://localhost:5173"); 
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
