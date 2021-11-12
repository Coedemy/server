const express = require('express')

const { stickersController } = require('../controllers')

const router = express.Router()

router.route('/')
    .get(stickersController.getAllStickersSuits)
    .post(stickersController.createStickersSuit)


module.exports = router