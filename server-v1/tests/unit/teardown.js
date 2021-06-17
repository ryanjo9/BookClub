const datasourceSchemas = require('../../datasources/schemas')
const { closeMongoConnection } = require('../../datasources')

const {
  setupUser1,
  setupUser2
} = require('./mockdata')
module.exports = async () => {
  console.log('tearing down tests')

  console.log('Removing test users')
  await datasourceSchemas.User.deleteOne({
    username: setupUser1.username
  })

  await datasourceSchemas.User.deleteOne({
    username: setupUser2.username
  })

  console.log('closing db connection')
  await closeMongoConnection()

  console.log('Tests cleaned up✨✨✨')
}
