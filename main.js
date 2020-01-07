const {app, BrowserWindow, ipcMain} = require('electron')
const isDev = require('electron-is-dev')   // 判断是否在开发环境
const AppWindow = require('./src/AppWindow')
const path = require('path')
let mainWindow, settingsWindow

function createWindow () {
  // Create the browser window.
  require('devtron').install()
  const mainWindowConfig = {
    width: 1440,
    height: 768,   
  }
  const urlLocation = isDev ? 'http://localhost:3000' : ''
  mainWindow = new AppWindow(mainWindowConfig, urlLocation)
  mainWindow.webContents.openDevTools()  // 开启调试

  // require('devtron').install()
}
app.on('ready', createWindow)