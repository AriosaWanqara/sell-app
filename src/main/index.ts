import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { ipcMain } from 'electron'
import Store from 'electron-store'

var AutoLaunch = require('auto-launch')

const store = new Store()

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    minWidth: 750,
    minHeight: 550,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true
    }
  })

  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = store.get(val)
  })
  ipcMain.on('electron-store-set', async (event, key, val) => {
    console.log(event)
    store.set(key, val)
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  var autoLauncher = new AutoLaunch({
    name: 'MyApp'
  })
  autoLauncher
    .isEnabled()
    .then(function (isEnabled) {
      if (isEnabled) return
      autoLauncher.enable()
    })
    .catch(function (err) {
      throw err
    })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
