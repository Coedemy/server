const express = require('express')

const { usersController } = require('../controllers')
const { uploadMultipleFiles } = require('../services/upload')

const router = express.Router()

router.route('/').get(usersController.getAllUsers)

router.route('/search').get(usersController.searchUserByUsername)

router.route('/:id').get(usersController.getUser)

router.route('/profile')
    .patch(uploadMultipleFiles(["avatar", "coverPicture"]), usersController.updateUser)

router.route('/profile/:key')
    .get(usersController.getCoverPicture)

module.exports = router