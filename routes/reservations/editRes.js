var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;


router.get('/:resId', function(req, res, next) {
    fetch("http://localhost:3002/reservation/deletebyResId/"+ req.params.resId ,{
        method: 'delete',
        body:   null,
        headers: { 'Content-Type': 'application/json' }})
        .then(res=>console.log(res));
    fetch("http://localhost:3002/reservation/getAll")
        .then(res=>res.json())
        .then(data=> res.render('reservations/showRes',{ data :data}))
});


module.exports = router;