var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;


router.get('/:cin', function(req, res, next) {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    fetch("http://localhost:3002/personnel/getbyCin/"+ req.params.cin)
    .then(res=> res.json())
    .then(data=> res.render('employees/showEmp',{ data: data }))
  });

module.exports = router;


