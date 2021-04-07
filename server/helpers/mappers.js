'use strict'

const mapUser = (user) => {
  if (!user) {
    return null
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name
  }
}

const mapBook = (book) => {
  if (!book) {
    return null
  }

  return {
    id: book._id,
    title: book.title,
    progress: book.progress,
    complete: book.complete,
    imgsrc: book.imgsrc,
    chapters: book.chapters
  }
}

const mapClub = (club) => {
  return {
    id: club._id,
    name: club.name,
    frequency: club.frequency,
    activeBook: mapBook(club.activeBook),
    mod: mapUser(club.mod),
    members: club.members.map(mapUser),
    books: club.books.map(mapBook),
    created: club.created
  }
}

module.exports = {
  mapClub,
  mapBook,
  mapUser
}
