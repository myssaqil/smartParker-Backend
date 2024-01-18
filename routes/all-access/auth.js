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



//Used
router.post('/user/register', AuthController.register)
router.post('/login', AuthController.login)
router.delete('/logout/:tokenDvc', AuthController.logOut )
router.get('/checkSession', AuthController.getSession )

router.get('/user', AuthController.getUser)

router.post('/sendVerifyEmail', AuthController.sendVerifyEmail)
router.get('/verify-email/:token', AuthController.verifyEmail)


//endUsed

//Maybe
router.get('/user/all', AuthController.allUser)
//End Maybe


//Unused
router.post('/parker/register', AuthController.register)
router.get('/token', AuthController.tokenUser)
router.put('/update', AuthController.isVerifyPermission)
router.put('/update/display', AuthController.updateUserDisplay)
router.put('/upload/imgProfile', AuthController.uploadImgProfile)
router.get('/checkEmailStatus/:email', AuthController.verifyemailCheck )
router.post('/uploadIMG', AuthController.uploadImg )

//endUsed