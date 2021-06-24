const express = require('express')
const router = express.Router()

var add = require('./addHotel');
var update = require('./updateHotel');
var remove = require('./deleteHotel');
var search = require('./searchHotel');
var getAll = require('./hotels');

// Retrieve all hotels
//router.use('/',getAll);
// Create a new hotel
router.use('/add',add);
// Retrieve a single hotel with id
//router.use('/:id',search);
// Update a hotel with id
//router.use('/:id',update);
// Delete a hotel with id
//router.use('/:id',remove);

module.exports = router