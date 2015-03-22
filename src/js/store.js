var constants = require('./action-constants');

var City = require('./city');
var Fluxxor = require('fluxxor');

var DEFAULT_CITIES = ['Berlin,de', 'Tokyo,jp', 'Moscow,ru'];

module.exports = Fluxxor.createStore({
    initialize: function () {
        this.cities = DEFAULT_CITIES.map(function(name){
           return new City(name, getRandom(5000, 8000), function(){
              // this looks like a hack :( But currently I don't know Flux good
              this.emit('change');
           }.bind(this))
        }, this);

        this.bindActions(
            constants.ADD_CITY, this.onAddCity,
            constants.DELETE_CITY, this.odDeleteCity
        );

        function getRandom(min, max) {
          return Math.random() * (max - min) + min;
        }
    },
    onAddCity: function(payload) {
        var city = new City(payload.cityName, payload.updateInterval, function() {
          this.emit('change')
        }.bind(this));

        this.cities.push(city);
    },
    odDeleteCity: function(cityId) {
        if (!this.cities[cityId]) {
            return false;
        }

        this.cities[cityId].destroy();
        this.cities.splice(cityId, 1);

        this.emit('change');
    },
    getState: function() {
        return {
            cities: this.cities
        }
    }
});
