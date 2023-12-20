var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const AuthController = require('../../controllers/all-access/AuthController');
const Middleware = require('../../middleware/SessionMiddleware');



router.get('/get', AuthController.adminPermission, function(req, res){
    res.send("Hello")
})

router.get('/test', Middleware.cekSession)


router.post('/user/register', AuthController.register)
router.post('/parker/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/user', AuthController.getUser)
router.get('/user/all', AuthController.allUser)
router.get('/token', AuthController.tokenUser)
router.post('/sendVerifyEmail', AuthController.sendVerifyEmail)
router.get('/verify-email/:token', AuthController.verifyEmail)
router.put('/update', AuthController.isVerifyPermission)
router.put('/update/display', AuthController.updateUserDisplay)
router.put('/upload/imgProfile', AuthController.uploadImgProfile)
router.delete('/logout/:tokenDvc', AuthController.logOut )
router.get('/checkEmailStatus/:email', AuthController.verifyemailCheck )
router.post('/uploadIMG', AuthController.uploadImg )