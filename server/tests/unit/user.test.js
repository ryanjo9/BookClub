const supertest = require('supertest')
const { app } = require('../../app')

const request = supertest(app)

describe('User endpoints', () => {
  it('should create a new user', async () => {
    const createUserResult = await request
      .post('/api/users')
      .send({
        username: 'username',
        password: 'password',
        name: 'name'
      })

    expect(createUserResult.status).toEqual(200)
    expect(createUserResult.body.id).toBeTruthy()
    expect(createUserResult.body.username).toBeTruthy()
    expect(createUserResult.body.name).toBeTruthy()
  })
})
