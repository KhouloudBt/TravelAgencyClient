var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;


function getRoles()
{
    return (fetch("http://localhost:3002/role/getAll")
    .then(res=>res.json()))
}

router.get('/', async function(req, res, next) {
  let listRoles = await getRoles();
 res.render('employees/addEmp',{ roles :listRoles})
});


router.post('/', function(req, res, next) {
  const roles=getRoles();

  if (req.body.confirmPassword != req.body.confirmPassword)
  {
    
      res.render('employees/addEmp',{ roles :roles,
       message:"passwords don't match !",
      classAlert:"alert alert-danger"})
  }
  else {
  fetch("http://localhost:3002/personnel/create", {
        method: 'post',
        body:   JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
     .then(res.render('employees/addEmp',{ roles :roles,
      message:"Employee added successfully !",
     classAlert:"alert alert-success"}))
    .catch(err => {res.render('employees/addEmp',{ roles :roles,
      message: err,
     classAlert:"alert alert-danger"})});
}});

module.exports = router;
