const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { User } = require('../schemas')
const { verifyToken } = require('../middlewares/require_auth')
const { throwError, ErrorStatus } = require('../helpers/error')
const { sendEmailSES } = require('../helpers/email')
const { sendSMS } = require('../helpers/sms')
const { generateAccessToken, generateRefreshToken } = require('../helpers/jwt')

let refreshTokens = []
const { AWS_SYSTEM_EMAIL } = process.env

const login = async (req, res) => {
  const { email, password } = req.body

  console.log({ email, password })
  const user = await User.findOne({ email })
  if (!user)
    return res.status(409).json({
      message: `Email does not exist!`,
    })

  const isValidPassword = await user.isValidPassword(password)
  console.log({ isValidPassword })

  if (!isValidPassword)
    return res.status(401).json({
      message: 'Wrong password!',
    })

  //sign token

  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
  }

  const accessToken = generateAccessToken(payload)

  const refreshToken = generateRefreshToken(payload)

  refreshTokens.push(refreshToken)

  // await sendEmailSES({
  //     to: AWS_SYSTEM_EMAIL,
  //     from: email,
  //     subject: 'Login successfully',
  //     text: 'Congratulation! You are authenticated. You can access our services.'
  // })

  // await sendSMS({
  //     phoneNumber: '+447700900123',
  //     message: 'Hello Khanh Chuong'
  // })

  res.status(200).json({
    user: payload,
    accessToken,
    refreshToken,
  })
}

const register = async (req, res) => {
  const { email, username, password } = req.body

  const user = await User.findOne({ email })
  if (user)
    return res.status(409).json({
      message: `Email already exist! Please select another email!`,
    })

  console.log({ email, username, password })

  const hash = await bcrypt.hash(password, 10)

  const createdUser = await User.create({
    username,
    email,
    password: hash,
  })

  const payload = {
    id: createdUser._id,
    email: createdUser.email,
    username: createdUser.username,
  }


  const accessToken = generateAccessToken(payload)
  const refreshToken = generateRefreshToken(payload)

  res.status(201).json({
    user: payload,
    accessToken,
    refreshToken
  })
}

const getAccessToken = (req, res) => {
  const authorizationHeader = req.headers['authorization']
  const refreshToken = authorizationHeader && authorizationHeader.split(' ')[1]

  const index = refreshTokens.find((t) => t === refreshToken)
  if (!index) {
    throwError(ErrorStatus.UNAUTHORIZED)
    return
  }

  const user = verifyToken(refreshToken, false)

  const accessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    username: user.username,
  })

  res.status(200).json({ accessToken })
}

const forgotPassword = (req, res) => { }

const updatePassword = (req, res) => { }

const logout = (req, res) => {
  const authorizationHeader = req.headers['authorization']
  const refreshToken = authorizationHeader && authorizationHeader.split(' ')[1]

  refreshTokens = refreshTokens.filter((t) => {
    return t !== refreshToken
  })

  res.sendStatus(204)
}

const fbLoginSuccess = (req, res) => {
  const { fbId, username } = req.user
  const accessToken = generateAccessToken({ fbId, username })
  res.status(200).json({ accessToken })
}

const fbLoginFailed = (req, res) => {
  res.status(400).json('Authenticate Failed')
}

module.exports = {
  login,
  register,
  forgotPassword,
  updatePassword,
  logout,
  getAccessToken,
  fbLoginSuccess,
  fbLoginFailed,
}
