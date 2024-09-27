// Write your tests here

const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})



test('sanity', () => {
  expect(true).toBe(true)
})

describe('[GET] /jokes', () => {
  test("won't allow access without token", async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401)
  })
  test('When no token found, responds with correct message', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.body).toMatchObject({
      message: 'token required'
    })
  })
})

describe('[POST] /register', () => {
  test('responds with new user information', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'test',
      password: 'test'
    })
    expect(res.body).toMatchObject({
      username: 'test'
    })
  })
  test('responds with a status 201', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'test2',
      password: 'test2'
    })
    expect(res.status).toBe(201)
  })
})

describe('[POST] /login', () => {
  test('can successfully log in after registering', async () => {
    await request(server).post('/api/auth/register').send({
      username: 'test',
      password: 'test'
    })
    const res = await request(server).post('/api/auth/login').send({
      username: 'test',
      password: 'test'
    })
    expect(res.status).toBe(200)
  })
  test('response upon login welcomes user', async () => {
    await request(server).post('/api/auth/register').send({
      username: 'test',
      password: 'test'
    })
    const res = await request(server).post('/api/auth/login').send({
      username: 'test',
      password: 'test'
    })
    expect(res.body).toMatchObject({
      message: 'welcome, test'
    })
  })
})