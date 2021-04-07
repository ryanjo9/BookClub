const supertest = require('supertest')
const datasources = require('../../datasources')
const app = require('../../app')

const {
  testUser1
} = require('./mockdata')

const request = supertest(app)

afterAll(async () => {
  await datasources.user.User.deleteOne({
    username: testUser1.username
  })

  await datasources.closeMongoConnection()
})

describe('User endpoints', () => {
  it('should create a new user', async () => {
    const createUserResult = await request
      .post('/api/users')
      .send(testUser1)

    expect(createUserResult.status).toEqual(200)
    expect(createUserResult.body.id).toBeTruthy()
    expect(createUserResult.body.username).toBe(testUser1.username)
    expect(createUserResult.body.name).toBe(testUser1.name)
  })

  it('should prevent duplicate usernames', async () => {
    const createUserResult = await request
      .post('/api/users')
      .send(testUser1)

    expect(createUserResult.status).toEqual(403)
  })

  it('should login with correct credentials', async () => {
    const loginResult = await request
      .post('/api/users/login')
      .send({
        username: testUser1.username,
        password: testUser1.password
      })

    expect(loginResult.status).toBe(200)
    expect(loginResult.body.username).toBe(testUser1.username)
    expect(loginResult.body.name).toBe(testUser1.name)
  })

  it('should not login with incorrect credentials', async () => {
    const loginResult = await request
      .post('/api/users/login')
      .send({
        username: testUser1.username,
        password: 'wrong'
      })

    expect(loginResult.status).toBe(403)
  })
})
