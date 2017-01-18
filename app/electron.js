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
  // create window and invisible as default
  const win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(config.url)
  win.hide()

  // create tray
  tray = new Tray(image)
  const contextMenu = Menu.buildFromTemplate([
    { label: '7℃~14℃', type: 'normal' },
    { type: 'separator' }, {
      label: 'show cities',
      submenu: [
        { label: '上海', type: 'normal' },
        { label: '北京', type: 'normal' },
        { label: '深圳', type: 'normal' }
      ]
    }, {
      label: 'show main window',
      type: 'normal',
      click: function(e, w) {
        win.show()
      }
    },
    { type: 'separator' },
    { label: 'close', type: 'normal', role: 'close' },
    { label: 'quit', type: 'normal', role: 'quit' }
  ])
  tray.setContextMenu(contextMenu)
})
