const supertest = require('supertest')
const datasources = require('../../datasources')
const app = require('../../app')
const { getLoginCookie } = require('./helpers')

const {
  setupUser1,
  setupUser2,
  testClub1,
  testClub2,
  testClub3,
  testClub4
} = require('./mockdata')

const request = supertest(app)

let user1cookie, user2cookie

afterAll(async () => {
  await datasources.closeMongoConnection()
})

beforeAll(async () => {
  user1cookie = await getLoginCookie(request, setupUser1)
  user2cookie = await getLoginCookie(request, setupUser2)
})

describe('Club endpoints', () => {
  afterEach(async () => {
    await Promise.all([
      datasources.club.Club.deleteMany({
        name: testClub1.name
      }),
      datasources.club.Club.deleteMany({
        name: testClub2.name
      }),
      datasources.club.Club.deleteMany({
        name: testClub3.name
      }),
      datasources.club.Club.deleteMany({
        name: testClub4.name
      })
    ])
  })

  it('should create a new club', async () => {
    const createResponse = await request
      .post('/api/clubs')
      .set('cookie', [user1cookie])
      .send(testClub1)

    expect(createResponse.status).toBe(200)

    const { body: club } = createResponse

    expect(club.name).toBe(testClub1.name)
    expect(club.frequency).toBe(testClub1.frequency)
    expect(club.mod.username).toBe(setupUser1.username)
    expect(club.members.length).toBe(1)
    expect(club.members[0].username).toBe(setupUser1.username)
  })

  it('should get a club by id', async () => {
    const createResponse = await request
      .post('/api/clubs')
      .set('cookie', [user1cookie])
      .send(testClub2)

    expect(createResponse.status).toBe(200)

    const getResponse = await request
      .get(`/api/clubs/${createResponse.body.id}`)
      .set('cookie', [user1cookie])

    expect(getResponse.status).toBe(200)

    const { body: club } = getResponse

    expect(club.name).toBe(testClub2.name)
    expect(club.frequency).toBe(testClub2.frequency)
    expect(club.mod.username).toBe(setupUser1.username)
    expect(club.members.length).toBe(1)
    expect(club.members[0].username).toBe(setupUser1.username)
  })

  it('should get clubs a user is a member of', async () => {
    await request
      .post('/api/clubs')
      .set('cookie', [user1cookie])
      .send(testClub3)

    await request
      .post('/api/clubs')
      .set('cookie', [user1cookie])
      .send(testClub3)

    const getResponse = await request
      .get('/api/clubs')
      .set('cookie', [user1cookie])

    expect(getResponse.status).toBe(200)

    const { body: clubs } = getResponse

    expect(clubs.length).toBe(2)
    expect(clubs[0].members[0].username).toBe(setupUser1.username)
    expect(clubs[1].members[0].username).toBe(setupUser1.username)
  })

  it('should add a user to a club', async () => {
    const createResponse = await request
      .post('/api/clubs')
      .set('cookie', [user1cookie])
      .send(testClub4)

    const addResponse = await request
      .put(`/api/clubs/${createResponse.body.id}/member`)
      .set('cookie', [user2cookie])

    expect(addResponse.status).toBe(200)

    const { body: club } = addResponse

    expect(club.members.length).toBe(2)
  })
})
