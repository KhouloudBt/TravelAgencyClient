var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('flight', { title: 'Voyage' });
});

router.get('/add', function(req, res, next) {
  res.render('flightCRUD/add', { title: 'Add Voyage' });
});

router.post('/add', function(req, res, next) {
  const obj = JSON.parse(JSON.stringify(req.body)); 
  console.log(obj);
  console.log(req.body)
  fetch("http://localhost:3002/voyage", {
        method: 'post',
        body:   JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
    fetch("http://localhost:3002/all")
  .then(res=>res.json())
  .then(data=> res.render('flightCRUD/list',{ data :data}))
});

router.get('/list', function(req, res, next) {
  console.log("HOHOHOHOHOOHHOHOH")

  fetch("http://localhost:3002/all")
  .then(res=>res.json())
  .then(data=> res.render('flightCRUD/list',{ data :data}))
 
});

router.get('/showOne/:id', function(req, res, next) {
  fetch("http://localhost:3002/voyages/" + req.params.id)
  .then(res=>res.json())
  .then(data=> res.render('flightCRUD/showOne',{ data: data }))
  
});

router.get('/edit/:id', function(req, res, next) {
  fetch("http://localhost:3002/voyages/" + req.params.id)
  .then(res=>res.json())
  .then(data=> res.render('flightCRUD/edit',{ data: data }))
  
});

router.post('/edit/:id', function(req, res, next) {
  console.log("hani nemchi");
  console.log(req.body);
  var voyage = new Object({
    id:parseInt(req.body.id),
    dateDepart: req.body.dateDepart,
      dateArrive: req.body.dateArrive,
      nom: req.body.nom,
      capacite: req.body.capacite,
      stat:req.body.stat
  });
  console.log(voyage.id);
  fetch("http://localhost:3002/voyages" ,{
    method: 'put',
    body:   JSON.stringify(voyage),
    headers: { 'Content-Type': 'application/json' },
  })
  fetch("http://localhost:3002/all")
  .then(res=>res.json())
  .then(data=> res.render('flightCRUD/list',{ data :data}))
  
});

router.get('/delete/:id', function(req, res, next) {
  fetch("http://localhost:3002/voyages/"+ req.params.id ,{
    method: 'delete',
    body:   null,
    headers: { 'Content-Type': 'application/json' }})
  fetch("http://localhost:3002/all")
  .then(res=>res.json())
  .then(data=> res.render('flightCRUD/list',{ data :data}))
});


module.exports = router;