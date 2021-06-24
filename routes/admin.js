var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');    
const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard', { title: 'Admin' });
});



module.exports = router;