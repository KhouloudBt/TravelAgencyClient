var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const { json } = require('express');
 
fetch.Promise = Bluebird;


router.get('/', function(req, res, next) {
  fetch("http://localhost:3002/personnel/getAll")

.then(res=>res.json())
.then(data=> res.render('employees/showEmps',{ data :data}))
});

module.exports = router;
