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

  let posts
  if (book.posts && book.posts.length) {
    if (book.posts[0].id) {
      posts = book.posts.map(mapPost)
    } else {
      posts = book.posts
    }
  }

  return {
    id: book._id,
    title: book.title,
    progress: book.progress,
    complete: book.complete,
    imgsrc: book.imgsrc,
    chapters: book.chapters,
    posts
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

const mapPost = (post) => {
  return {
    id: post._id,
    author: mapUser(post.author),
    text: post.text,
    created: post.created,
    book: mapBook(post.book),
    comments: post.comments
  }
}

const mapComment = (comment) => {
  return {
    id: comment._id,
    author: mapUser(comment.author),
    text: comment.text,
    created: comment.created,
    post: mapPost(comment.post)
  }
}

module.exports = {
  mapClub,
  mapBook,
  mapUser,
  mapPost,
  mapComment
}
