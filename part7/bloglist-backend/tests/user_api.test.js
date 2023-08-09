const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('when database is empty and new user is created', () => {
  test('when username is unique and password is longer than 3 chars then new user is created successfully', async () => {
    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(1)
  }, 100000)

  test('fails when password is under 3 characters in length', async () => {
    const invalidPassword = 'te'

    const invalidUser = { ...helper.newUser, password: invalidPassword }

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(0)
    expect(response.body).toEqual({
      error: 'Password must be at least 3 characters long',
    })
  }, 100000)

  test('fails when username is under 3 characters in length', async () => {
    const invalidUsername = 'te'

    const invalidUser = { ...helper.newUser, username: invalidUsername }

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(0)
    expect(response.body).toEqual({
      error: `User validation failed: username: Path \`username\` (\`${invalidUsername}\`) is shorter than the minimum allowed length (3).`,
    })
  }, 100000)

  test('fails when username is not unique', async () => {
    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(1)
    expect(response.body).toEqual({
      error:
        'User validation failed: username: Error, expected `username` to be unique. Value: `testUser`',
    })
  }, 100000)
})

afterAll(async () => {
  await mongoose.connection.close()
})
