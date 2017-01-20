exports.citiesMenuGenerater = function (citiesArray, handleClick) {
  return citiesArray.map((city, index) => {
    return {
      label: city.name,
      type: 'radio',
      checked: city.meta.checked,
      click: function(menuItem, browserWindow, event) {
        handleClick(city.name)
      }
    }
  })
}
