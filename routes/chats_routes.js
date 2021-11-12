const express = require('express')
const router = express.Router()

const { chatsController } = require('../controllers')

router.route('/')
    .get(chatsController.getChats)
    .post(chatsController.createChat)

router.route('/:id')
    .get(chatsController.getChat)
    .patch(chatsController.updateChat)
    .delete(chatsController.deleteChat)

router.route('/:id/messages')
    .get(chatsController.getMessages)

module.exports = router