var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const ParkerController = require('../../controllers/all-access/ParkerController');


router.post('/parker-street', ParkerController.parkerStreet)
router.post('/parker-latlong', ParkerController.parkerLatlong)
router.post('/parker-all', ParkerController.parkerAll)
