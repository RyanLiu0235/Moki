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
  const win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(config.url)
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
})
