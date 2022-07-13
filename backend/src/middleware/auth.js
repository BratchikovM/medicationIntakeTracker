const jwt = require('jsonwebtoken')
const CONSTS = require('../const')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, CONSTS.JWT_SECRET_KEY)
    const userEmail = decodedToken.email

    if (!userEmail) {
      throw 'User not found'
    } else {
      next()
    }
  } catch (e) {
    res.status(401).json({
      error: 'No auth!'
    })
  }
}