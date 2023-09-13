import { ElectronAPI } from '@electron-toolkit/preload'
import cp from 'child_process'

// Custom APIs for renderer
const prisma = new PrismaClient()
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    child_process: cp
    fs
    store
  }
}
