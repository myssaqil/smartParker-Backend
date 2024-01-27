var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const EmployeeController = require('../../controllers/parker/EmployeeController');

router.get('/', EmployeeController.ParkerEmployeeGetList)
router.post('/create', EmployeeController.ParkerEmployeeCreate)
router.delete('/delete/:id', EmployeeController.ParkerEmployeeDelete)