const express = require('express')
const router = express.Router()

const { orderController } = require('../controllers')

router.get('/', orderController.getOrder)

module.exports = router