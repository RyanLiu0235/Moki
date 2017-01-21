const separator = [{ type: 'separator' }]
const winMenu = [
  { label: '最小化', type: 'normal', role: 'minimize' },
  { label: '退出', type: 'normal', role: 'quit' }
]
let chooseCityMenu = function(goTo) {
  return [{
    label: '更多',
    type: 'normal',
    click: function() {
      goTo('city-page')
    }
  }]
}
let infoMenu = [{ label: '暂无数据', type: 'normal' }]
let settingMenu = [{
  label: '选择城市',
  type: 'submenu',
  submenu: []
}, {
  label: '刷新',
  type: 'normal',
  role: 'reload'
}, {
  label: '设置',
  type: 'normal'
}]

const citiesMenuGenerater = function(citiesArray, handleClick) {
  return citiesArray.map((city, index) => {
    return {
      label: city.name,
      type: 'radio',
      checked: city.meta.checked,
      click: function() {
        handleClick(city.name)
      }
    }
  })
}

/**
 * generate menu template for menu
 * 
 * @param  {Object} win         
 * @param  {Array} citiesArray 
 * @return {Array} 
 */
exports.menuTemplateGenerator = function(win, citiesArray) {
  function changeCity(city) {
    win.webContents.send('change-city', city)
  }

  function goTo(page) {
    win.webContents.send('go-to', page)
  }
  settingMenu[0]['submenu'] = citiesMenuGenerater(citiesArray, changeCity)
    .concat(separator)
    .concat(chooseCityMenu(goTo))

  settingMenu[2]['click'] = function() {
    goTo('setting-page')
  }

  return infoMenu
    .concat(separator)
    .concat(settingMenu)
    .concat(separator)
    .concat(winMenu)
}
