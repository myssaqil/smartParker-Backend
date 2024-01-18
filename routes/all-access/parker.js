var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const ParkerController = require('../../controllers/all-access/ParkerController');
const AutoUpdate = require('../../controllers/all-access/AutoUpdateData');
const HandleParkerController = require('../../controllers/parker/HandleParkerController');

// router.post('/hihi', ParkerController.eahhh)
router.post('/AutoUpdate', AutoUpdate.AutoUpdate)
router.post('/test', ParkerController.parkerStreet)
router.post('/latlong', ParkerController.parkerLatlong)
router.get('/detail/:idParking', ParkerController.parkerDetail)
router.post('/parker-all', ParkerController.parkerAll)
router.post('/order', ParkerController.parkerOrder)

router.get('/nearest', HandleParkerController.getParking)
router.post('/parker-create', HandleParkerController.createByUserParker)
router.post('/parker-update/:id', HandleParkerController.updateByUserParker)
router.delete('/parker-delete/:id', HandleParkerController.deleteByUserParker)
