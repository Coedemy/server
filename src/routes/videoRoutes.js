const express = require('express')
const router = express.Router()

const { uploadMultipleFiles } = require('../helpers/upload')

const { videoController } = require('../controllers')

router.post('/transcode', uploadMultipleFiles(['video']), videoController.transcode)

router.get('/:videoKey', videoController.streamVideo)

module.exports = router