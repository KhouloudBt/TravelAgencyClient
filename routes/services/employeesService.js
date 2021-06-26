const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const adminService = require("./adminService")
fetch.Promise = Bluebird;


var getRoles=  function(queryParam) {
    return (fetch("http://localhost:3002/role/getAll")
.then(res=>res.json()))
}

var employeesService = function() {
    var redirectAdd= async function(req, res, message, alertClass) {
        let listRoles = await getRoles();
        console.log(message);
        if (message)
        res.render('employees/addEmp',{ roles :listRoles,message:message, alertClass: alertClass})
        else 
        res.render('employees/addEmp',{ roles :listRoles, message:"null", alertClass: "null"})
    }

    var redirectEdit= async function(req, res, message, alertClass) {
        fetch("http://localhost:3002/personnel/delete/" + req.params.cin, {
            method: "delete",
            body: null,
            headers: { "Content-Type": "application/json" },
          }).then((res) => console.log(res));
        let listRoles = await getRoles();
        console.log(message);
        if (message)
        res.render('employees/editEmp',{ data :listRoles,message:message, alertClass: alertClass})
        else 
        res.render('employees/editEmp',{ roles :listRoles, message:"null", alertClass: "null"})
    }

    var redirectList= async function(req, res) {
        console.log(req.session.user)
        if (req.session.user != null)
        adminService.redirectLogin(req,res);
        else {
        fetch("http://localhost:3002/personnel/getAll")
        .then((response) => response.json())
        .then((data) => 
        
        res.render('employees/showEmps',{ data :data})
       
        ) }}


    
    return {
        redirectAdd: redirectAdd
       ,getRoles: getRoles
       ,redirectEdit:redirectEdit
       ,redirectList:redirectList

    }
}();

module.exports = employeesService;