const express = require('express')
const router = express.Router()

const { reviewController } = require('../controllers')

router.get('/', reviewController.getReview)

module.exports = router