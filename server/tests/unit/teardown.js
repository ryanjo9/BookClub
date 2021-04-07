const datasources = require('../../datasources')
const {
  setupUser1,
  setupUser2
} = require('./mockdata')

module.exports = async () => {
  console.log('tearing down tests')

  console.log('Removing test users')
  await datasources.user.User.deleteOne({
    username: setupUser1.username
  })

  await datasources.user.User.deleteOne({
    username: setupUser2.username
  })

  console.log('closing db connection')
  await datasources.closeMongoConnection()

  console.log('Tests cleaned up✨✨✨')
}
