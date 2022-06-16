const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const electronReload = require('electron-reload')

electronReload(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  hardResetMethod: 'exit'
});

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    width: 780,
    height: 640,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false ,
      devTools: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
mainWindow.loadFile('index.html');


ipcMain.on('minimizeApp', () => {
  mainWindow.minimize()
})

ipcMain.on('maximizeRestoreApp', () => {
  if (mainWindow.isMaximized()) mainWindow.unmaximize()
  else mainWindow.maximize()
})

ipcMain.on('closeApp', () => {
  mainWindow.close()
})


mainWindow.on("maximize", () => {
  mainWindow.webContents.send("isMaximized")
})
mainWindow.on("unmaximize", () => {
  mainWindow.webContents.send("isRestored")
})


mainWindow.on("focus", () =>{
  mainWindow.webContents.send("isFocus")
})

mainWindow.on("blur", () =>{
  mainWindow.webContents.send("isBlur")
})
}


app.whenReady().then(() => {
  createWindow()

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



