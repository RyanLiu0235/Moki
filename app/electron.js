'use strict'

const { app, Menu, BrowserWindow, Tray, nativeImage, ipcMain } = require('electron')
const { menuTemplateGenerator } = require('./controller/menu.controller')

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

// app
app.on('ready', () => {
  // create window 
  const win = new BrowserWindow({ width: 1000, height: 600 })
  win.loadURL(config.url)
  win.webContents.openDevTools()

  // create tray
  tray = new Tray(image)

  let menuTemplate = menuTemplateGenerator(win, [])
  let contextMenu = Menu.buildFromTemplate(menuTemplate)
  tray.setContextMenu(contextMenu)

  ipcMain.on('update-city', (event, cities) => {
    menuTemplate = menuTemplateGenerator(win, cities)
    contextMenu = Menu.buildFromTemplate(menuTemplate)
    tray.setContextMenu(contextMenu)
  })
})
