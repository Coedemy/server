const express = require('express')
const router = express.Router()

const { messagesController } = require('../controllers')

router.route('/')
    .post(messagesController.createMessage)

router.route('/:id')
    .post(messagesController.markAsRead)
    .delete(messagesController.deleteMessage)

module.exports = router