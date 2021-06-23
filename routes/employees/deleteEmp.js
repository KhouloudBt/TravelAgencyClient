var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;


router.get('/:cin', function(req, res, next) {
    fetch("http://localhost:3002/personnel/delete/"+ req.params.cin ,{
      method: 'delete',
      body:   null,
      headers: { 'Content-Type': 'application/json' }})
      .then(res=>console.log(res));
    fetch("http://localhost:3002/personnel/getAll")
    .then(res=>res.json())
    .then(data=> res.render('employees/showEmps',{ data :data}))
  });
  
  
  module.exports = router;