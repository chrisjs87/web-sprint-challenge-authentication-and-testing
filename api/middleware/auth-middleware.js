const User = require('../users/users-model')

const checkUserNameExists = async (req, res, next) => {
  const existing = await User.findByUsername({ username: req.body.username })
  if (existing) {
    next({ status: 400, message: "username taken" })
  } else {
    next()
  }
}

const checkBodyEntered = (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password || username === undefined || password === undefined) {
    next({ status: 400, message: "username and password required" })
  } else {
    next()
  }
}

module.exports = {
  checkUserNameExists,
  checkBodyEntered,
}