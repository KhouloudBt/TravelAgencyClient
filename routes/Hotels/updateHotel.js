var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
/*
var hotel ={ name:"",phone:'0',stars:0, webSite:"", country: "",city: "",roomCouple:0,roomSingle:0,allInclusive:0,photo: ""};

*/

router.get('/:id', function(req, res, next) {	
	fetch("http://localhost:3002/hotels/"+req.params.id)
	.then(res => res.json())
	.then(json =>  res.render('Hotels/updateHotel', { hotel:json[0] } ));
});

module.exports = router;
