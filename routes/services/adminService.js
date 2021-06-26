const fetch = require('node-fetch'); 

const Bluebird = require('bluebird');

fetch.Promise = Bluebird;
var adminHome = function() {
    var redirectHome= async function(req, res) {
        console.log("UUUUUUUUUUUUUUUUUDEEEEEEEER")
        console.log(req.session.user);
        if( req.session.user && req.session.user.id_role==2)
        {
        let nbEmp = await getNumberEmployees();
        let nbTrips = await getNumberTrips();

  res.render('admin/home', { nbEmp: nbEmp.number, nbTrips:nbTrips.number});
        }
        else {
            res.render('login/auth');
        }
    }

    var getNumberEmployees=  function(queryParam) {
        return (fetch("http://localhost:3002/personnel/getNumber")
    .then(res=>res.json()))
    }

    var redirectLogin=  function(req, res) {
       return  res.render('login/auth');
    }
    var getNumberTrips= function(req, res) {
        return (fetch("http://localhost:3002/trips/getNumber")
    .then(res=>res.  json()))
    }
    
    return {
        redirectHome: redirectHome
       ,getNumberEmployees: getNumberEmployees
       , getNumberTrips:getNumberTrips
       ,redirectLogin:redirectLogin
    }
}();

module.exports = adminHome;