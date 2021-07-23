const User = require('../users/users-model')

const checkUserNameExists = async (req, res, next) => {
  const existing = await User.findByUsername({ username: req.body.username })
  if (existing) {
    next({ status: 400, message: "username taken" })
  } else {
    next()
  }
}

module.exports = {
  checkUserNameExists,
}