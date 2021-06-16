const schemas = require('./schemas')

const createPost = async (post, user, meeting) => {
  const dbPost = new schemas.Post({
    ...post,
    comments: [],
    author: user,
    meeting: meeting._id,
    seenBy: [],
    edits: []
  })

  await dbPost.save()

  return dbPost
}

const getPostById = async (postId) => {
  return schemas.Post.findById(postId).populate('author').populate('comments').populate('seenBy')
}

const getMeetingPosts = async (meetingId) => {
  return schemas.Post.find({
    meeting: meetingId
  }).populate('author')
}

const getUserPosts = async (user) => {
  return schemas.Post.find({
    author: user._id
  }).populate('author')
}

module.exports = {
  createPost,
  getPostById,
  getMeetingPosts,
  getUserPosts
}
