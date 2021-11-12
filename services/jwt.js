const jwt = require('jsonwebtoken')

const { throwError, ErrorStatus } = require('../services/error')

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

const accessTokenOptions = { expiresIn: '12h' }

const verifyToken = (token, isAccessToken = true) => {
  try {
    const tokenSecret = isAccessToken
      ? ACCESS_TOKEN_SECRET
      : REFRESH_TOKEN_SECRET
    return jwt.verify(token, tokenSecret)
  } catch {
    throwError(ErrorStatus.UNAUTHORIZED)
  }
}

const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, accessTokenOptions)
}

const generateRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET)
}

module.exports = {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
}
