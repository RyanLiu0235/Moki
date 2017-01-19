exports.citiesMenuGenerater = function (citiesArray, handleClick) {
  return citiesArray.map((city, index) => {
    return {
      label: city,
      type: 'radio',
      click: function(menuItem, browserWindow, event) {
        handleClick(city)
      }
    }
  })
}
