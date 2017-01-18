'use strict'

const { app, Menu, BrowserWindow, Tray, nativeImage } = require('electron')
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
  tray = new Tray(image)
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setContextMenu(contextMenu)
})
