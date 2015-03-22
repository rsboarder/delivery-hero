var constants = require('./action-constants');

module.exports = {
  addCity: function (cityName, updateInterval) {
    this.dispatch(constants.ADD_CITY, {
      cityName: cityName,
      updateInterval: updateInterval
    });
  },
  deleteCity: function (cityId) {
    this.dispatch(constants.DELETE_CITY, cityId);
  }
};
