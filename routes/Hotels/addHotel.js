var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;

var hotel ={ name:"",phone:'0',stars:0, webSite:"", country: "",city: "",roomCouple:0,roomSingle:0,allInclusive:0,photo: ""};

router.get('/', function(req, res, next) {
  res.render('Hotels/addHotel', { message: '',classAlert:'' });
});

router.post('/', function(req, res, next) {
//hotel=body
console.log( req.body)
fetch("http://localhost:3002/hotels/", {
        method: 'post',
        body:  JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
     .then(res.render('Hotels/addHotel',{
      message:"Hotel added successfuly",
     classAlert:"alert alert-success"}))
    .catch(err => {res.render('Hotels/addHotel',{
      message: "err",
     classAlert:"alert alert-danger"})});
});
module.exports = router;

