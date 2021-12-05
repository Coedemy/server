const express = require('express')

const { userController } = require('../controllers')
const { requireAuth } = require('../middlewares/require_auth')
const { uploadMultipleFiles } = require('../services/upload')

const router = express.Router()

router.get('/', userController.getAllUsers)

router.get('/search', userController.searchUserByUsername)

router.post('/cart', requireAuth, userController.initCart)

router.patch('/cart', requireAuth, userController.updateCart)

router.get('/:id', userController.getUser)

router.patch('/profile', uploadMultipleFiles(["avatar", "coverPicture"]), userController.updateUser)

router.get('/profile/:key', userController.getCoverPicture)


module.exports = router