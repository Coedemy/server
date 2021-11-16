const express = require('express')

const { userController } = require('../controllers')
const { uploadMultipleFiles } = require('../services/upload')

const router = express.Router()

router.route('/').get(userController.getAllUsers)

router.route('/search').get(userController.searchUserByUsername)

router.route('/:id').get(userController.getUser)

router.route('/profile')
    .patch(uploadMultipleFiles(["avatar", "coverPicture"]), userController.updateUser)

router.route('/profile/:key')
    .get(userController.getCoverPicture)

module.exports = router