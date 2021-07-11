'use strict';

const axios = require('axios');

module.exports = getMoviesHandler;

let inMemory = {};


function getMoviesHandler(req, res) {

    let movieName = req.query.movieName;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_KEY}&query=${movieName}`;
    if (inMemory[movieName] !== undefined) {
        console.log('Data From Server');
        res.status(200).send(inMemory[movieName]);
    } else {
        axios
            .get(url)
            .then(moviesData => {
                console.log(moviesData);

                let moviesInfo = moviesData.data.results.map(item => {
                    return new Movie(item.title, item.poster_path, item.original_language, item.vote_average, item.overview, item.vote_count, item.popularity, item.release_date);
                });
                console.log('first', moviesInfo);

                res.status(200).send(moviesInfo);
            }).catch(err => {
                res.status(500).send(`Server Error 500 ${err}`);
            })
    }
}

class Movie {
    constructor(title, poster_path, original_language, vote_average, overview, vote_count, popularity, release_date) {
        this.title = title;
        this.poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`;
        this.original_language = original_language;
        this.vote_average = vote_average;
        this.overview = overview;
        this.vote_count = vote_count;
        this.popularity = popularity;
        this.release_date = release_date;
    }
}