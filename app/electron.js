'use strict'

const { app, Menu, BrowserWindow, Tray, nativeImage, ipcMain } = require('electron')
const path = require('path')

let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

let tray = null
let image = nativeImage.createFromPath(`${__dirname}/icons/moki.png`)

app.on('ready', () => {
  // create window 
  const win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(config.url)

  // create tray
  tray = new Tray(image)
  const contextMenu = Menu.buildFromTemplate([
    { label: '7℃~14℃', type: 'normal' },
    { type: 'separator' }, {
      label: '选择城市',
      submenu: [{
        label: '上海',
        type: 'radio',
        checked: true,
        click: function(menuItem, browserWindow, event) {
          win.webContents.send('change-city', 'shanghai');
        }
      }, {
        label: '北京',
        type: 'radio',
        click: function(menuItem, browserWindow, event) {
          win.webContents.send('change-city', 'beijing');
        }
      }, {
        label: '深圳',
        type: 'radio',
        click: function(menuItem, browserWindow, event) {
          win.webContents.send('change-city', 'shenzhen');
        }
      }]
    }, {
      label: '打开窗口',
      type: 'normal',
      click: function(menuItem, browserWindow) {
        win.show()
        win.webContents.openDevTools()
      }
    }, 
    { type: 'separator' },
    { label: '最小化', type: 'normal', role: 'minimize' },
    { label: '退出', type: 'normal', role: 'quit' }
  ])
  tray.setContextMenu(contextMenu)
})
