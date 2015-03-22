var React = require('react');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var City = require('./city.jsx');


module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("CityStore")],

    getInitialState: function(){
        return {
            cityName: '',
            updateInterval: 5000
        }
    },

    addNewCity: function (e) {
        e.preventDefault();
        var cityName = this.state.cityName.trim();
        var interval = this.state.updateInterval;

        if (cityName.length) {
            this.getFlux().actions.addCity(cityName, interval);
            this.setState({
                cityName: '',
                updateInterval: 5000
            });
        }
    },

    getStateFromFlux: function (){
        var flux = this.getFlux();
        return flux.store("CityStore").getState();
    },

    handleCityNameChange: function (e) {
        this.setState({
            cityName: e.target.value
        });
    },

    handleDeleteClick: function(id) {
        this.getFlux().actions.deleteCity(id);
    },

    handleIntervalChange: function(e){
        this.setState({
            updateInterval: e.target.value
        });
    },

    render: function(){
        return (
            <div className='cities'>
                <div className='cities-list'>
                    {this.state.cities.map(function(city, index) {
                        return <City key={index}
                                city={city}
                                handleDelete={this.handleDeleteClick.bind(this, index)}
                                />
                    }, this)}

                    <form className='cities__form' onSubmit={this.addNewCity}>
                        <h3 className='cities__form-caption'>Add New City</h3>
                        <input className='cities__form-input' type="text"
                                placeholder="Eg: Berlin,De"
                                value={this.state.cityName} required
                                onChange={this.handleCityNameChange}/>

                        <input className='cities__form-input' type="number"
                                placeholder="Update interval"
                                value={this.state.updateInterval}
                                onChange={this.handleIntervalChange}/>
                        <button className='cities__form-button' type="submit">Add</button>
                    </form>
                </div>
            </div>
        );
    }
});