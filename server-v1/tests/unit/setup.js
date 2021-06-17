const datasources = require('../../datasources')

const {
  setupUser1,
  setupUser2
} = require('./mockdata')

module.exports = async () => {
  console.log('setting up tests')

  console.log('Saving test users')
  await datasources.user.createUser(setupUser1)
  await datasources.user.createUser(setupUser2)

  console.log('Tests are ready to go🚀🚀🚀')
}
