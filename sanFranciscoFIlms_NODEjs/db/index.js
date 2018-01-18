'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURL);

Mongoose.connection.on('error', error => {
    // logger.log('error', 'Mongoose connection error: ' + error);
});

const sanFranciscoFilm = new Mongoose.Schema(
    {

        "Title" : String,
        "Release Year" : Number,
        "Locations" : String,
        "Fun Facts" : String,
        "Production Company" : String,
        "Distributor" : String,
        "Director" : String,
        "Writer" : String,
        "Actor 1" : String,
        "Actor 2" : String,
        "Actor 3" : String,
        coords:{lat:Number,lng:Number}
    }

);

const sanFranciscoFilmModel = Mongoose.model('sanfranciscofilm', sanFranciscoFilm);


module.exports = {
    Mongoose,
    sanFranciscoFilmModel

};

