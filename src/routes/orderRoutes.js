const express = require('express')
const router = express.Router()

const { orderController } = require('../controllers')
const { requireAuth } = require('../middlewares/require_auth')

router.post('/checkout', requireAuth, orderController.checkout)

module.exports = router