var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;



function getRoles()
{
    return fetch("http://localhost:3002/role/getAll")
    .then(res=>res.json());    
   
}

router.get('/:cin', async function(req, res, next) {
 ;
  const listRoles=await getRoles();
 // getRoles().then(res=>{console.log(res)});
  fetch("http://localhost:3002/personnel/getbyCin/"+ req.params.cin)
  .then(res=> res.json())
  .then(emp => {res.render('employees/editEmp',{ roles : listRoles, data:emp})})
console.log(listRoles)});


router.post('/:id', function(req, res, next) {
let cin = req.body.cin
  var pers = new Object({
      cin:cin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      nom: req.body.nom,
      sexe: req.body.sexe,
      id_role:req.body.id_role,
      telephone:req.body.telephone,
      password:req.body.password

  });
console.log(pers);
  fetch("http://localhost:3002/personnel/update" ,{
    method: 'put',
    body:   JSON.stringify(pers),
    headers: { 'Content-Type': 'application/json' },
  })
  console.log("done");
  fetch("http://localhost:3002/personnel/getAll")
  .then(res=>res.json())
  .then(data=> res.render('employees/showEmps',{ data :data}))
  
});



/*router.post('/', function(req, res, next) {
  const roles=getRoles();

  if (req.body.confirmPassword != req.body.confirmPassword)
  {
    
      res.render('employees/editEmp',{ roles :roles,
       message:"passwords don't match !",
      classAlert:"alert alert-danger"})
  }
  else {
  fetch("http://localhost:3002/personnel/update", {
        method: 'post',
        body:   JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
     .then(res.render('employees/editEmp',{ roles :roles,
      message:"Employee added successfully !",
     classAlert:"alert alert-success"}))
    .catch(err => {res.render('employees/editEmp',{ roles :roles,
      message: err,
     classAlert:"alert alert-danger"})});
}});
*/
module.exports = router;
