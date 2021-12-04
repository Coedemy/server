const { throwError, ErrorStatus } = require('../services/error')
const { verifyToken } = require('../services/jwt')

const requireAuth = (req, res, next) => {
  const authorizationHeader = req.headers['authorization']
  const accessToken = authorizationHeader && authorizationHeader.split(' ')[1]

  try {
    if (!accessToken)
      throwError(ErrorStatus.UNAUTHORIZED)

    const data = verifyToken(accessToken)
    req.user = data
    next()
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  requireAuth,
  verifyToken
}