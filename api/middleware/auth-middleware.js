const User = require('../users/users-model')

const checkUserNameUnique = async (req, res, next) => {
  const existing = await User.findByUsername({ username: req.body.username })
  if (existing) {
    // req.user = existing
    next({ status: 400, message: "username taken" })
  } else {
    next()
  }
}

const checkUserNameExists = async (req, res, next) => {
  const existing = await User.findByUsername2({ username: req.body.username })
  // console.log('checking user name exists')
  // console.log(existing)
  if (!existing) {
    next({ status: 401, message: "invalid credentials" })
  } else {
    req.user = existing
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
  checkUserNameUnique,
}