var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const VehicleController = require('../../controllers/users/VehicleController');

router.get('/', VehicleController.VehicleUserGet)
router.post('/create', VehicleController.VehicleUserCreate)
router.delete('/delete/:id', VehicleController.VehicleUserDelete)