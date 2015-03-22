var React = require('React');

module.exports = React.createClass({
    render: function () {
        var city = this.props.city;

        return (
            <div className='cities-list__item'>
                <span className='cities-list__button-delete' onClick={this.props.handleDelete}>Remove</span>
                <h3 className='cities-list__city-name'>
                    {city.getName()}
                    <img className='cities-list__icon-weather'
                            alt={city.getWeatherConditions()}
                            src={city.getWeatherImage()}
                            title={city.getWeatherConditions()} />
                </h3>
                <p className='cities-list__row'>
                    <label className='cities-list__parameter-name'>Temperature:</label>
                    <span className="cities-list__parameter-value">
                        {city.getTemperature()}
                    </span>
                </p>
                <p className='cities-list__row'>
                    <label className='cities-list__parameter-name'>Weather:</label>
                    <span className="cities-list__parameter-value">
                        {city.getWeatherConditions()}
                    </span>
                </p>
            </div>
        )
    }
});