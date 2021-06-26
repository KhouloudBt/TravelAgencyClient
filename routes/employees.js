var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const employeesService = require("./services/employeesService");
const authService = require("./services/adminService");

const Bluebird = require("bluebird");
const { render } = require("../app");

fetch.Promise = Bluebird;

function getRoles() {
  return fetch("http://localhost:3002/role/getAll").then((res) => res.json());
}

router.get("/add", async function (req, res, next) {
  if (req.session.user && req.session.user.id_role ==2)
  employeesService.redirectAdd(req, res);
  else authService.redirectLogin(req,res);
});

router.post("/add", function (req, res, next) {
  if (req.session.user && (req.body.password != req.body.confirmPassword)) {
    employeesService.redirectAdd(
      req,
      res,
      "passwords don't match !",
      "alert alert-danger"
    );
  } else {
    
    fetch("http://localhost:3002/personnel/create", {
      method: "post",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {response.json()
        console.log(response.status);
         if (response.status==200)
        {
          employeesService.redirectAdd(
            req,
            res,
            "Employee added successfully !",
            "alert alert-success"
          )
        }
        else {
          console.log(response)
          employeesService.redirectAdd(req, res, "Please verify your info !", "alert alert-danger");
        }
        
        })  }})   
             
  


router.get("/delete/:cin", function (req, res, next) {
  if (req.session.user && req.session.user.id_role ==2)
{
  fetch("http://localhost:3002/personnel/delete/" + req.params.cin, {
    method: "delete",
    body: null,
    headers: { "Content-Type": "application/json" },
  });
  employeesService.redirectList(req,res); 
}
 else authService.redirectLogin(req,res)});


router.get("/edit/:cin", async function (req, res, next) {
  const listRoles = await getRoles();
  fetch("http://localhost:3002/personnel/getbyCin/" + req.params.cin)
    .then((res) => res.json())
    .then((emp) => {
      res.render("employees/editEmp", { roles: listRoles, data: emp });
    });
  console.log(listRoles);
});

router.post("/edit/:id", function (req, res, next) {
  let cin = req.body.cin;
  var pers = new Object({
    cin: cin,
    nom: req.body.nom,
    prenom: req.body.prenom,
    nom: req.body.nom,
    sexe: req.body.sexe,
    id_role: req.body.id_role,
    telephone: req.body.telephone,
    password: req.body.password,
  });
  fetch("http://localhost:3002/personnel/update", {
    method: "put",
    body: JSON.stringify(pers),
    headers: { "Content-Type": "application/json" },
  });
  console.log("done");
  fetch("http://localhost:3002/personnel/getAll")
    .then((res) => res.json())
    .then((data) => res.render("employees/showEmps", { data: data }));
});

router.get("/show/:cin", function (req, res, next) {
  fetch("http://localhost:3002/personnel/getbyCin/" + req.params.cin)
    .then((res) => res.json())
    .then((data) => res.render("employees/showEmp", { data: data }));
});

router.get("/show", function (req, res, next) {
  fetch("http://localhost:3002/personnel/getAll")
    .then((res) => res.json())
    .then((data) => res.render("employees/showEmps", { data: data }));
});

module.exports = router;
