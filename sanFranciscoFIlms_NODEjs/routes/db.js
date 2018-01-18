const db = require('../db');

let request = require("request");
const geocoder = require('geocoder');

/*In this file all the dirty database work will be done*/

let findByKeyWord = function (location) {

    let API_KEY = "AIzaSyDbNaLIUbc_PNEF-qRuL--Z5mGfXwj670s";
    let BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    // var address = "1600 Amphitheatre Parkway, Mountain View, CA";
    let address = location + " San Francisco";

    let url = BASE_URL + address + "&key=" + API_KEY;

    request({url}, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            let coords;
            let bodyObj = JSON.parse(body);
            if(bodyObj && bodyObj.results && bodyObj.results[0] && bodyObj.results[0].geometry)
                 coords = bodyObj.results[0].geometry.location;
            else {
                return;
            }
            db.sanFranciscoFilmModel
                .update({Locations: location,}, {"$set": {coords: coords}}, {"multi": true}, function (err,results) {
                    if (err) return console.error(err);
                    if (results) return console.error(results);
                })
        }
        else {
            // The request failed, handle it
        }
    });
};

let addLocationsInsanFranciscoFilmsInit = function () {

    db.sanFranciscoFilmModel.find({"coords" : { $exists : false }}).exec(function (err, result) {
        console.log(err);

         for(i=0;i<result.length;++i){
            findByKeyWord(result[i]._doc.Locations);
        }
        console.log('finished');
    });
};
let searchSFMoviesInDB = function (criteraObj) {

    let field = Object.keys(criteraObj)[0];
    criteraObj[field] = new RegExp('.*'+ criteraObj[field] +'.*','i');
     return db.sanFranciscoFilmModel.distinct(field,criteraObj).exec(function (err, result) {
        console.log(err);
        console.log(result);
    });

};
let searchSFRecordInDB = function (criteraObj) {
     return db.sanFranciscoFilmModel.find(criteraObj).exec(function (err, result) {
        console.log(err);
        console.log(result);
    });

};

module.exports = {
    addLocationsInsanFranciscoFilmsInit,
    searchSFMoviesInDB,
    searchSFRecordInDB
};

