const supertest = require('supertest')
const { closeMongoConnection } = require('../../datasources')
const dbSchemas = require('../../datasources/schemas')
const app = require('../../app')

const {
  setupUser1,
  setupUser2,
  testClub1,
  testClub2,
  testClub3,
  testClub4
} = require('./mockdata')
const { getLoginCookie } = require('./helpers')

const request = supertest(app)

let user1cookie, user2cookie

beforeAll(async () => {
  user1cookie = await getLoginCookie(request, setupUser1)
  user2cookie = await getLoginCookie(request, setupUser2)
})

afterAll(async () => {
  await closeMongoConnection()
})

describe('Club endpoints', () => {
  afterEach(async () => {
    await Promise.all([
      dbSchemas.Club.deleteMany({
        name: testClub1.name
      }),
      dbSchemas.Club.deleteMany({
        name: testClub2.name
      }),
      dbSchemas.Club.deleteMany({
        name: testClub3.name
      }),
      dbSchemas.Club.deleteMany({
        name: testClub4.name
      })
    ])
  })

  it('should create a new club', async () => {
    const createClubResponse = await request
      .post('/api/clubs')
      .set('cookie', [user1cookie])
      .send(testClub1)

    expect(createClubResponse.status).toBe(200)

    const { body: club } = createClubResponse

    expect(club.name).toBe(testClub1.name)
  })

  it('should get a club by id', async () => {
    const createResponse = await request
      .post('/api/clubs')
      .set('cookie', [user1cookie])
      .send(testClub2)

    expect(createResponse.status).toBe(200)

    const getResponse = await request
      .get(`/api/clubs/${createResponse.body._id}`)
      .set('cookie', [user1cookie])

    expect(getResponse.status).toBe(200)

    const { body: club } = getResponse

    expect(club.name).toBe(testClub2.name)
    expect(club.mods.length).toBe(1)
    expect(club.mods[0].username).toBe(setupUser1.username)
    expect(club.members.length).toBe(1)
    expect(club.members[0].username).toBe(setupUser1.username)
    expect(club.createdBy.username).toBe(setupUser1.username)
    expect(club.created).toBeDefined()
  })

  it('should get all clubs belonging to a user', async () => {
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

  it('should allow a user to join a club', async () => {
    const createResponse = await request
      .post('/api/clubs')
      .set('cookie', [user1cookie])
      .send(testClub4)

    const joinResponse = await request
      .post(`/api/clubs/${createResponse.body._id}/join`)
      .set('cookie', [user2cookie])

    expect(joinResponse.status).toBe(200)

    const { body: club } = joinResponse

    expect(club.members[1].username).toBe(setupUser2.username)
  })
})
