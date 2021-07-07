'use strict';

const express = require('express');
require('dotenv').config();

const cors = require('cors');

const weatherData = require('./data/weather.json')


const server = express();
const PORT = process.env.PORT;
server.use(cors());


// localhost:3001/
server.get('/', (req, res) => {
    res.status(200).send('home route')
})


//localhost:3001/weather?city=amman
server.get('/weather', (req, res) => {
    console.log(req.query);
    try {
        let selectedCity = weatherData.find(weather => {
            if (weather.city_name.toLocaleLowerCase()=== req.query.city) {
                return weather
            }
        })
        // res.status(200).send(selectedCity);

        let newWeather = selectedCity.data.map(weatherForCity => {
            return new Forecast(weatherForCity.valid_date, weatherForCity.weather.description);
        });
        res.status(200).send(newWeather);
    } catch (err) {
        res.status(500).send('Error 500: Wrong request');
    }
})



server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}