var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const { json } = require('express');
 router.use( express.static( "public" ) );
fetch.Promise = Bluebird;
/*
var hotel ={ name:"",phone:'0',stars:0, webSite:"", country: "",city: "",roomCouple:0,roomSingle:0,allInclusive:0,photo: ""};

*/
let hotel;

	function getHotel(req,res) {
	return	fetch("http://localhost:3002/hotels/"+req.params.id)
	.then(res => res.json())
	.then(json =>  res.render('Hotels/deleteHotel', { hotel:json[0] } ));
	}

router.get('/:id', function(req, res, next) {	
	getHotel(req,res);
});


router.post('/:id', function(req, res, next) {
	console.log("deleting")
	fetch("http://localhost:3002/hotels/"+req.params.id, {
        method: 'delete',
        body:  JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
     .then(res.redirect('/hotels/'));
     //,console.log("Hotel " +req.body.name+ " updated successfuly")
 });

module.exports = router;
