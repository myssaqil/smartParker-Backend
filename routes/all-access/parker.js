var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const ParkerController = require('../../controllers/all-access/ParkerController');
const HandleParkerController = require('../../controllers/parker/HandleParkerController');

router.post('/parker-street', ParkerController.parkerStreet)
router.post('/parker-latlong', ParkerController.parkerLatlong)
router.post('/parker-all', ParkerController.parkerAll)

router.get('/parker', HandleParkerController.getParking)
router.post('/parker-create', HandleParkerController.createByUserParker)
router.post('/parker-update/:id', HandleParkerController.updateByUserParker)
router.delete('/parker-delete/:id', HandleParkerController.deleteByUserParker)
