var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const ReportParkingController = require('../../controllers/users/ReportParkingController');