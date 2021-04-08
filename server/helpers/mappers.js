'use strict'

const mapUser = (user) => {
  if (!user) {
    return null
  }

  return {
    id: user._id,
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
    chapters: book.chapters,
    posts: book.posts.map(id => {
      return { id }
    })
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
    books: club.books.map(id => {
      return { id }
    }),
    created: club.created
  }
}

const mapPost = (post) => {
  return {
    id: post._id,
    author: mapUser(post.author),
    text: post.text,
    created: post.created,
    book: {
      id: post.book
    },
    comments: post.comments.map(id => {
      return { id }
    })
  }
}

const mapComment = (comment) => {
  return {
    id: comment._id,
    author: mapUser(comment.author),
    text: comment.text,
    created: comment.created,
    post: {
      id: comment.post._id
    }
  }
}

module.exports = {
  mapClub,
  mapBook,
  mapUser,
  mapPost,
  mapComment
}
