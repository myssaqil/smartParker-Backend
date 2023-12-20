var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const ParkingController = require('../../controllers/users/TransactionParkingController');