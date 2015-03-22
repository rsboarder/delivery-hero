require('whatwg-fetch');

var KELVIN_BASE = 273.15;

function City (name, updateInterval, fetchCallback) {
  var REFRESH_INTERVAL = updateInterval || 5000;

  this.interval = null;
  this.name = name;

  this.fetchData(fetchCallback).then(function () {
    var self = this;
    if (!self.interval) {
      self.interval = setInterval(function () {
        self.fetchData(fetchCallback);
      }, REFRESH_INTERVAL);
    }
  }.bind(this));
}

City.prototype.destroy = function () {
  clearInterval(this.interval);
};

City.prototype.getName = function () {
  return this.name;
};

City.prototype.getWeatherConditions = function () {
  if (!this.weather) {
    return '';
  }

  return this.weather[0].description;
};

City.prototype.getWeatherImage = function () {
  return this.weather ? "http://openweathermap.org/img/w/" + this.weather[0].icon + '.png' : ''
};

City.prototype.getTemperature = function () {
  return this.temperature
};

City.prototype.fetchData = function (fetchCallback) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.name;

  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log('fetched', this.name);

    this.temperature = Math.round(json.main.temp - KELVIN_BASE);
    this.weather = json.weather;
  }.bind(this)).then(function () {
    if (fetchCallback) {
      fetchCallback.call(null);
    }
  }).catch(function (e) {
    console.error('Error while fetching weather.', e);
  });
};

module.exports = City;
