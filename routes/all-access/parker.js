var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const ParkerController = require('../../controllers/all-access/ParkerController');
const AutoUpdate = require('../../controllers/all-access/AutoUpdateData');
const HandleParkerController = require('../../controllers/parker/HandleParkerController');

// router.post('/hihi', ParkerController.eahhh)
//Auto update udah dipanggil di app.js
router.post('/AutoUpdate', AutoUpdate.AutoUpdate)

//Test socket
router.post('/test', ParkerController.parkerStreet)

//getbylatlong with distance
router.post('/latlong', ParkerController.parkerLatlong)
//Get detail by id
router.get('/detail/:idParking', ParkerController.parkerDetail)

//GET BY AUTH TOKEN
router.get('/list/auth', ParkerController.parkerByAuth)
router.get('/list/pending/auth', ParkerController.parkerByAuthPending)


//GET ALL BLM UPDATE MAYBE
router.post('/parker-all', ParkerController.parkerAll)

//
router.post('/order', ParkerController.parkerOrder)
router.get('/order/user', ParkerController.OrderUserGetOnGoing)
router.get('/order/user/done', ParkerController.OrderUserGetDoneFailed)

router.get('/scan/get/:id', ParkerController.scan) //kasih respon datanya
router.post('/scan/update/:id', ParkerController.updateScan) //kasih respon datanya
router.post('/xendit', ParkerController.xendit) //kasih respon datanya
// router.get('/nearest', HandleParkerController.getParking)
// router.post('/parker-create', HandleParkerController.createByUserParker)
// router.post('/parker-update/:id', HandleParkerController.updateByUserParker)
// router.delete('/parker-delete/:id', HandleParkerController.deleteByUserParker)
