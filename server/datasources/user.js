const daos = require('./daos')

const findByUsername = async (username) => {
  return daos.User.findOne({
    username
  })
}

const createUser = async ({ username, password, name }) => {
  const user = new daos.User({
    username,
    password,
    name
  })

  await user.save()

  return user
}

const logOut = async (user, token) => {
  user.removeToken(token)

  await user.save()
}

module.exports = {
  findByUsername,
  createUser,
  logOut,
  User: daos.User
}
