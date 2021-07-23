const db = require('../../data/dbConfig')

function findByUsername(username) {
  return db('users')
    .select('username')
    .where(username).first()
}

function addUser({ username, password }) {

}

module.exports = {
  findByUsername,
  addUser,
}