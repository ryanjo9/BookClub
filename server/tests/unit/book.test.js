const supertest = require('supertest')
const datasources = require('../../datasources')
const app = require('../../app')
const { getLoginCookie } = require('./helpers')

const {
  setupUser2,
  testClub4,
  testBook1
} = require('./mockdata')

const request = supertest(app)

let user2cookie
let club
const bookIds = []

beforeAll(async () => {
  user2cookie = await getLoginCookie(request, setupUser2)

  const createResponse = await request
    .post('/api/clubs')
    .set('cookie', [user2cookie])
    .send(testClub4)

  club = createResponse.body
})

afterAll(async () => {
  await datasources.club.Club.findByIdAndDelete(club.id)

  await Promise.all(bookIds.map((id) => {
    return datasources.book.Book.findByIdAndDelete(id)
  }))

  await datasources.closeMongoConnection()
})

describe('Book tests', () => {
  it('should add a book to club', async () => {
    const createResponse = await request
      .post(`/api/books/${club.id}`)
      .set('cookie', [user2cookie])
      .send(testBook1)

    const getClubResponse = await request
      .get(`/api/clubs/${club.id}`)
      .set('cookie', [user2cookie])

    expect(createResponse.status).toBe(200)

    const { body: book } = createResponse

    expect(book.title).toBe(testBook1.title)
    expect(book.chapters).toBe(testBook1.chapters)
    expect(book.progress).toBe(0)
    expect(book.imgsrc).toBe(testBook1.imgsrc)
    expect(book.complete).toBe(false)

    const { body: updatedClub } = getClubResponse

    expect(updatedClub.activeBook.id).toBe(book.id)
    expect(updatedClub.books.length).toBe(1)
    expect(updatedClub.books[0].id).toBe(book.id)

    bookIds.push(book.id)
  })

  it('should update book progress', async () => {
    const createResponse = await request
      .post(`/api/books/${club.id}`)
      .set('cookie', [user2cookie])
      .send(testBook1)

    const { body: book } = createResponse

    const updateResponse = await request
      .put(`/api/books/${book.id}`)
      .set('cookie', [user2cookie])
      .send({ progress: 30 })

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body.progress).toBe(30)

    bookIds.push(book.id)
  })

  it('should complete a book', async () => {
    const createResponse = await request
      .post(`/api/books/${club.id}`)
      .set('cookie', [user2cookie])
      .send(testBook1)

    const { body: book } = createResponse

    const updateResponse = await request
      .put(`/api/books/${book.id}/complete`)
      .set('cookie', [user2cookie])

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body.complete).toBe(true)

    bookIds.push(book.id)
  })
})
