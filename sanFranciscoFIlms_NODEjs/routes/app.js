const express = require('express');
const router = express.Router();
const dbHelper = require('./db');

router.get('/addLocation',function (req,res,next) {

    console.log('in add locations');
    let criteriaObj = {_id: req.body._id};
    if(!req.body._id) criteriaObj = {};
    dbHelper.addLocationsInsanFranciscoFilmsInit();
});

router.post('/searchsf',function (req,res,next) {

    console.log('searching movies');
    let criteriaObj = req.body;
    if(!criteriaObj) criteriaObj = {};

    dbHelper.searchSFMoviesInDB(criteriaObj).then(function (value) {
        res.json(value);
    });
});

router.post('/searchsfrecord',function (req,res,next) {
    let criteriaObj = req.body;
    if(!criteriaObj) return;

    dbHelper.searchSFRecordInDB(criteriaObj).then(function (value) {
        res.json(value);
    });
});



module.exports = router;
