exports.citiesMenuGenerater = function (citiesArray, handleClick) {
  return citiesArray.map((city, index) => {
    return {
      label: city.name,
      type: 'radio',
      click: function(menuItem, browserWindow, event) {
        handleClick(city.name)
      }
    }
  })
}
