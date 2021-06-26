var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const { json } = require('express');
router.use( express.static( "public" ) );
fetch.Promise = Bluebird;


router.get('/', function(req, res, next) {
  fetch("http://localhost:3002/hotels/")

.then(res=>res.json())
.then(data=> res.render('Hotels/getAllhotelsClient',{ data :data}))
});

module.exports = router;
