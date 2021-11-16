const express = require('express')
const router = express.Router()

const { lectureController } = require('../controllers')

router.get('/', lectureController.getLectureContent)

module.exports = router