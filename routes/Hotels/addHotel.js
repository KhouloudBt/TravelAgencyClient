var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Hotels/addHotel', { title: 'hello' });
});

module.exports = router;
