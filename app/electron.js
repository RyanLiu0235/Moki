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

  ipcMain.on('update-city', (event, cities) => {
    citiesArray = cities
  })

  // generate context menu
  let citiesArray = [{
    name: '北京',
    meta: {
      city: '北京',
      cnty: '中国',
      checked: true
    }
  },{
    name: '上海',
    meta: {
      city: '上海',
      cnty: '中国',
      checked: false
    }
  },{
    name: '深圳',
    meta: {
      city: '深圳',
      cnty: '中国',
      checked: false
    }
  },{
    name: '广州',
    meta: {
      city: '广州',
      cnty: '中国',
      checked: false
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
  let infoMenu = [{ label: '暂无数据', type: 'normal' }]
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

  // create tray
  tray = new Tray(image)

  settingMenu[0]['submenu'] = citiesMenuGenerater(citiesArray, function(city) {
      win.webContents.send('change-city', city)
    })
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
