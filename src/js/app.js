var Fluxxor = require('fluxxor');
var React = require('React');

var App = require('./views/base.jsx');
var CityStore = require('./store');

var flux = new Fluxxor.Flux({
    CityStore: new CityStore()
}, require('./actions'));


React.render(<App flux={flux} />, document.querySelector('#weather-app'));
