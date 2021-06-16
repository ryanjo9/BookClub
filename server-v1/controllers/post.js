const datasources = require('../datasources')

const createPost = async (req, res, next) => {
  const { user, body, params } = req

  const meeting = await datasources.meeting.getMeetingById(params.meetingId)

  const postParams = {
    text: body.text
  }

  const savedPost = await datasources.post.createPost(postParams, user, meeting)

  await datasources.meeting.addPostToMeeting(meeting._id, savedPost)

  req.post = savedPost

  next()
}

const getPostById = async (req, res, next) => {
  const { params } = req

  const post = await datasources.post.getPostById(params.postId)

  req.post = post

  next()
}

const getMeetingPosts = async (req, res, next) => {
  const { params } = req

  const posts = await datasources.post.getMeetingPosts(params.meetingId)

  req.posts = posts

  next()
}

const getUserPosts = async (req, res, next) => {
  const { user } = req

  const posts = await datasources.post.getUserPosts(user)

  req.posts = posts

  next()
}

module.exports = {
  createPost,
  getPostById,
  getMeetingPosts,
  getUserPosts
}
