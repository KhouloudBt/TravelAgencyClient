const express = require('express')
const router = express.Router()

var add = require('./addHotel');
var update = require('./updateHotel');
var remove = require('./deleteHotel');
var search = require('./searchHotel');
var getAll = require('./hotels');

// Retrieve all hotels
router.use('/',getAll);
// Create a new hotel
router.use('/add',add);
// Retrieve a single hotel with id
router.use('/hotel/',search);
// Update a hotel with id
router.use('/update/',update);
// Delete a hotel with id
router.use('/delete/',remove);

module.exports = router