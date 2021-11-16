const express = require('express')
const router = express.Router()

const { quizController } = require('../controllers')

router.get('/', quizController.getQuiz)

module.exports = router