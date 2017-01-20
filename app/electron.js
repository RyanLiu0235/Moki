'use strict'

const { app, Menu, BrowserWindow, Tray, nativeImage, ipcMain } = require('electron')
const { citiesMenuGenerater } = require('./controller/menu.controller')

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

  // generate context menu
  let citiesArray = ['武汉', '宜昌']
  let defaultCitiesMenu = [{
    label: '上海',
    type: 'radio',
    checked: true,
    click: function(menuItem, browserWindow, event) {
      win.webContents.send('change-city', '上海')
    }
  }, {
    label: '北京',
    type: 'radio',
    click: function(menuItem, browserWindow, event) {
      win.webContents.send('change-city', '北京')
    }
  }, {
    label: '深圳',
    type: 'radio',
    click: function(menuItem, browserWindow, event) {
      win.webContents.send('change-city', '深圳')
    }
  }, {
    label: '广州',
    type: 'radio',
    click: function(menuItem, browserWindow, event) {
      win.webContents.send('change-city', '广州')
    }
  }]
  let chooseCityMenu = [{
    label: '更多',
    type: 'normal',
    click: function() {
      win.webContents.send('go-to', 'city-page')
    }
  }]

  let separator = [{ type: 'separator' }]
  let infoMenu = [{ label: '7℃~14℃', type: 'normal' }]
  let settingMenu = [{
    label: '选择城市',
    type: 'submenu',
    submenu: []
  }, {
    label: '打开窗口',
    type: 'normal',
    click: function(menuItem, browserWindow) {
      win.show()
      win.webContents.openDevTools()
    }
  }, {
    label: '设置',
    type: 'normal',
    click: function(menuItem, browserWindow) {
      win.webContents.send('change-city', 'setting-page');
    }
  }]
  let winMenu = [
    { label: '最小化', type: 'normal', role: 'minimize' },
    { label: '退出', type: 'normal', role: 'quit' }
  ]
  ipcMain.on('update-city', (event, cities) => {
    citiesArray = cities
  })

  // create tray
  tray = new Tray(image)

  settingMenu[0]['submenu'] = defaultCitiesMenu
    .concat(citiesMenuGenerater(citiesArray, function(city) {
      win.webContents.send('change-city', city)
    }))
    .concat(separator)
    .concat(chooseCityMenu)

  const menuTemplate = infoMenu
    .concat(separator)
    .concat(settingMenu)
    .concat(separator)
    .concat(winMenu)
  const contextMenu = Menu.buildFromTemplate(menuTemplate)
  tray.setContextMenu(contextMenu)
})
