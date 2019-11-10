var jwt = require('jsonwebtoken')
const config = require('../config/app')

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req
  console.warn('authorization', authorization)

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1]
  }
  return null
}

const verifyToken = (req, res, next) => {
  const token = getTokenFromHeaders(req)
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res.status(401).send({ auth: false, message: 'Invalid token' })

    req.userId = decoded.id
    next()
  })
}

module.exports = verifyToken
