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
  }).populate('author').sort({ created: -1 })
}

const getUserPosts = async (user) => {
  return schemas.Post.find({
    author: user._id
  }).populate('author').sort({ created: -1 })
}

const addCommentToPost = async (postId, comment) => {
  const update = { $push: { comments: comment } }
  const options = { new: true, upsert: true }

  return schemas.Post.findByIdAndUpdate(postId, update, options)
}

module.exports = {
  createPost,
  getPostById,
  getMeetingPosts,
  getUserPosts,
  addCommentToPost
}
