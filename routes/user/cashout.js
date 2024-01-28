var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const CashoutController = require('../../controllers/users/CashoutController');

router.get('/get/:id', CashoutController.CashOutGet)
router.post('/create', CashoutController.CashOutCreate)
router.post('/update/:id', CashoutController.CashOutUpdate)
router.delete('/delete/:id', CashoutController.CashOutDelete)