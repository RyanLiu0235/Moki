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
  let _cities = []
  let _weather = {}
  tray.setContextMenu(contextMenu)

  ipcMain.on('update-city', (event, cities) => {
    _cities = cities
    menuTemplate = menuTemplateGenerator(win, _cities)
    contextMenu = Menu.buildFromTemplate(menuTemplate)
    tray.setContextMenu(contextMenu)
  })

  ipcMain.on('update-weather', (event, weather) => {
    _weather = weather
    menuTemplate = menuTemplateGenerator(win, _cities, weather)
    contextMenu = Menu.buildFromTemplate(menuTemplate)
    tray.setContextMenu(contextMenu)
  })
})
