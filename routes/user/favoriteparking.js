var express = require('express')
const router = express.Router()
module.exports = router
const { body, validationResult } = require('express-validator');
const FavController = require('../../controllers/users/FavoriteParkingController');

router.get('/:DVC_ID', FavController.FavoriteUserGet)
router.post('/create', FavController.FavoriteUserCreate)
router.post('/validate', FavController.validateFav)
router.delete('/delete/:id', FavController.FavoriteUserDelete)