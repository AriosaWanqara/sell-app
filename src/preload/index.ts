import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import cp from 'child_process'
import fs from 'fs'

const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('child_process', {
      child_process: cp
    })
    contextBridge.exposeInMainWorld('fs', {
      fs: fs
    })
    contextBridge.exposeInMainWorld('store', {
      store: {
        get(key) {
          return ipcRenderer.sendSync('electron-store-get', key)
        },
        set(property, val) {
          ipcRenderer.send('electron-store-set', property, val)
        }
        // Other method you want to add like has(), reset(), etc.
      }
      // Any other methods you want to expose in the window object.
      // ...
    })
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
