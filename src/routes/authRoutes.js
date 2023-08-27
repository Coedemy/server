const express = require('express')
const router = express.Router()
const { authController } = require('../controllers')
// const { passport, loginPassportFb } = require('../helpers/oauth')

// router.use(passport.initialize())

// router.get('/facebook', loginPassportFb)
// router.get('/facebook/secrets', loginPassportFb, authController.fbLoginSuccess)
// router.get('/facebook/failed', authController.fbLoginFailed)

router.route('/login').post(authController.login)
router.route('/register').post(authController.register)
router.route('/logout').delete(authController.logout)
router.route('/forgot-password').post(authController.forgotPassword)
router.route('/update-password').post(authController.updatePassword)
router.route('/token').post(authController.getAccessToken)

module.exports = router