var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;


router.get('/:resId', function(req, res, next) {
    fetch("http://localhost:3002/reservation/getbyResId/"+ req.params.resId)
        .then(res=> res.json())
        .then(data=> res.render('reservations/showRes',{ data: data }))
});

module.exports = router;


