'use strict';

const axios = require('axios');

module.exports = getWeatherHandler;


function getWeatherHandler(req, res) {

    let cityName = req.query.cityName;

    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&city=${cityName}&days=5`;

    axios
        .get(url)
        .then(weatherData => {
            console.log(weatherData);
            let weatherInfo = weatherData.data.data.map(item => {
                return new Forecast(item);
            });
            console.log(weatherInfo);

            res.status(200).send(weatherInfo);
        }).catch(err => {
            res.status(500).send('Server Error 500');
        })
}

class Forecast {
    constructor(forecast) {
        this.valid_date = forecast.valid_date;
        this.description = forecast.weather.description;
    }
}