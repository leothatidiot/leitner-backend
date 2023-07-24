const jwt = require('jsonwebtoken')

const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  } else {
    req.token = null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (req.token === null) {
    req.user = null
  } else {
    try {
      const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET)
      req.user = await User.findById(decodedToken.userId)
    } catch (exception) {
      req.user = null
      console.log('decode token failed, err:', exception)
    }
  }
  next()
}

module.exports = { tokenExtractor, userExtractor }
