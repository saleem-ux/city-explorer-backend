// 'use strict';

// const express = require('express');
// require('dotenv').config();

// const cors = require('cors');

// const weatherData = require('./data/weather.json')


// const server = express();
// const PORT = process.env.PORT;
// server.use(cors());


// // localhost:3001/
// server.get('/', (req, res) => {
//     res.status(200).send('home route')
// })


// //localhost:3001/weather?city=amman
// server.get('/weather', (req, res) => {
//     console.log(req.query);
//     try {
//         let selectedCity = weatherData.find(weather => {
//             if (weather.city_name.toLocaleLowerCase()=== req.query.city) {
//                 return weather
//             }
//         })
//         // res.status(200).send(selectedCity);

//         let newWeather = selectedCity.data.map(weatherForCity => {
//             return new Forecast(weatherForCity.valid_date, weatherForCity.weather.description);
//         });
//         res.status(200).send(newWeather);
//     } catch (err) {
//         res.status(500).send('Error 500: Wrong request');
//     }
// })



// server.listen(PORT, () => {
//     console.log(`Listening on PORT ${PORT}`);
// })

// class Forecast {
//     constructor(date, description) {
//         this.date = date;
//         this.description = description;
//     }
// }

// ==============================================lab08===========================================================
// ===============================================================================================================

// 'use strict';

// const express = require('express');

// require('dotenv').config();

// const cors = require('cors');

// const server = express();

// server.use(cors());

// const PORT = process.env.PORT;

// const axios = require('axios');

// //  Routes
// server.get('/test', testHandler);
// // localhost:3001/
// server.get('/', (req, res) => {
//     res.status(200).send('home route')
// })

// // Function Handlers
// function testHandler(req, res) {
//     res.status(200).send('home');
// }

// //=============================>Weather server<====================================

// // localhost:3001/getWeather?cityName=Amman
// server.get('/getWeather', getWeatherHandler);

// function getWeatherHandler(req, res) {

//     let cityName = req.query.cityName;

//     let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&city=${cityName}&days=5`;

//     axios
//         .get(url)
//         .then(weatherData => {
//             console.log(weatherData);
//             let weatherInfo = weatherData.data.data.map(item => {
//                 return new Forecast(item);
//             });
//             console.log(weatherInfo);

//             res.status(200).send(weatherInfo);
//         }).catch(err => {
//             res.status(500).send('Server Error 500');
//         })
// }

// class Forecast {
//     constructor(forecast) {
//         this.valid_date = forecast.valid_date;
//         this.description = forecast.weather.description;
//     }
// }




// //=============================>Movies server<====================================


// // http://localhost:3001/getMovies?movieName=Amman
// server.get('/getMovies', getMoviesHandler);

// function getMoviesHandler(req, res) {

//     let movieName = req.query.movieName;

//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_KEY}&query=${movieName}`;

//     axios
//         .get(url)
//         .then(moviesData => {
//             console.log(moviesData);

//             let moviesInfo = moviesData.data.results.map(item => {
//                 return new Movie(item.title, item.poster_path, item.original_language, item.vote_average, item.overview, item.vote_count, item.popularity, item.release_date);
//             });
//             console.log('first', moviesInfo);

//             res.status(200).send(moviesInfo);
//         }).catch(err => {
//             res.status(500).send(`Server Error 500 ${err}`);
//         })
// }

// class Movie {
//     constructor(title, poster_path, original_language, vote_average, overview, vote_count, popularity, release_date) {
//         this.title = title;
//         this.poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`;
//         this.original_language = original_language;
//         this.vote_average = vote_average;
//         this.overview = overview;
//         this.vote_count = vote_count;
//         this.popularity = popularity;
//         this.release_date = release_date;
//     }
// }


// server.listen(PORT, () => {
//     console.log(`Listening on PORT ${PORT}`);
// })


// ==============================================lab09===========================================================
// ===============================================================================================================

'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const server = express();

server.use(cors());

const PORT = process.env.PORT;

const axios = require('axios');

const getWeatherHandler = require('./modules/Weather');

const getMoviesHandler = require('./modules/Movies');

const getRestaurantsHandler = require('./modules/Restaurant');
//  Routes
server.get('/test', testHandler);
// localhost:3001/
server.get('/', (req, res) => {
    res.status(200).send('home route')
})

// Function Handlers
function testHandler(req, res) {
    res.status(200).send('home');
}

//=============================>Weather server<====================================

// localhost:3001/getWeather?cityName=Amman
server.get('/getWeather', getWeatherHandler);






//=============================>Movies server<====================================


// http://localhost:3001/movie?movieName=Amman
server.get('/movie', getMoviesHandler);


//=============================>Restaurant server<====================================


// localhost:3001/restaurants?restaurantsName=Seattle
server.get('/restaurants', getRestaurantsHandler);



server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})




