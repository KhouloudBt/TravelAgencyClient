var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;

router.get('/addRes', function(req, res, next) {
    fetch("http://localhost:3002/reservation/getbyResId/"+ req.params.Id)
        .then(res=> res.json())
        .then(json =>  res.render('reservations/addRes', ));

});

router.post('/addRes', function(req, res, next) {
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    console.log(req.body)
    fetch("http://localhost:3002/reservation", {
        method: 'post',
        body:   JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
    fetch("http://localhost:3002/reservation/getAll")
        .then(res=>res.json())
        .then(data=> res.render('reservations/showReservations',{ data :data}))
});

router.get('/delete/:resId', function(req, res, next) {
    fetch("http://localhost:3002/reservation/deletebyResId/"+ req.params.resId ,{
        method: 'delete',
        body:   null,
        headers: { 'Content-Type': 'application/json' }})
        .then(res=>console.log(res));
    fetch("http://localhost:3002/reservation/getAll")
        .then(res=>res.json())
        .then(data=> res.render('reservations/showReservations',{ data :data}))
});


router.get('/showOne/:Id', function(req, res, next) {
    fetch("http://localhost:3002/reservation/getbyResId/"+ req.params.Id)
        .then(res=> res.json())
        .then(json =>  res.render('reservations/showRes', { data:json[0] } ));

});



router.get('/show', function(req, res, next) {
    fetch("http://localhost:3002/reservation/getAll")

        .then(res=>res.json())
        .then(data=> res.render('reservations/showReservations',{ data :data}))
});


router.get('/edit/:resId', function(req, res, next) {
    fetch("http://localhost:3002/reservation/getbyResId/"+ req.params.resId)
        .then(res=>res.json())
        .then(json =>  res.render('reservations/editRes', { data:json[0] } ));
});

router.post('/edit/:resId', function(req, res, next) {
    console.log("derergerge")
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    console.log(req.body)
    fetch("http://localhost:3002/reservation/update/"+ req.params.resId, {
        method: 'put',
        body:   JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res=>console.log(res))
    fetch("http://localhost:3002/reservation/getAll")
        .then(res=>res.json())
        .then(data=> res.render('reservations/showReservations',{ data :data}))
});


module.exports = router;