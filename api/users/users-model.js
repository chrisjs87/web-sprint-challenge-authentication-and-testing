const db = require('../../data/dbConfig')

function findByUsername(username) {
  return db('users')
    .select('username')
    // .select('id', 'username', 'password')
    .where(username).first()
    // .where('username', username).first()
}

function findByUsername2(username) {
  return db('users')
    // .select('username')
    .select('id', 'username', 'password')
    .where(username).first()
    // .where('username', username).first()
}

function findById(user_id) {
  return db('users')
    .select('id', 'username', 'password')
    .where('id', user_id).first()
}

async function addUser({ username, password }) {
  const [user_id] = await db('users').insert({ username, password })
  return findById(user_id)
}

module.exports = {
  findByUsername,
  addUser,
  findByUsername2
}