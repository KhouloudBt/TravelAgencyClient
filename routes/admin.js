var express = require('express');
var router = express.Router();
const fetch = require('node-fetch'); 
const session = require('express-session'); 
const auth = require ('./')  ;

const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;


function getNumberEmployees()
{
    return (fetch("http://localhost:3002/personnel/getNumber")
    .then(res=>res.json()))
}

function getNumberTrips()
{
    return (fetch("http://localhost:3002/trips/getNumber")
    .then(res=>res.json()))
}
/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log();
  let nbEmp = await getNumberEmployees();
  let nbTrips = await getNumberTrips();

  console.log(nbEmp);
  res.render('admin/home', { nbEmp: nbEmp.number, nbTrips:nbTrips.number});
});



module.exports = router;