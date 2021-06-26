var express = require('express');
var router = express.Router();
const fetch = require('node-fetch'); 
const session = require('express-session'); 
const adminService = require ('./services/adminService')  ;

const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;

router.get('/', async function(req, res, next) {
  if (req.session.user != null && req.session.user.id_role==2)
  adminService.redirectHome(req,res);
  else 
  adminService.redirectLogin(req,res);
});

module.exports = router;