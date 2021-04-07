const daos = require('./daos')

const createClub = async ({ mod, activeBook, name, frequency, members }) => {
  const club = new daos.Club({
    mod,
    activeBook,
    name,
    frequency,
    members
  })

  await club.save()

  return club
}

const getClubById = async (id) => {
  return daos.Club.findOne({
    _id: id
  }).populate('mod').populate('members')
}

const getUserClubs = async (user) => {
  return daos.Club.find({
    members: {
      $in: [user]
    }
  }).populate('mod').populate('members')
}

const addUserToClub = async (user, clubId) => {
  const club = await daos.Club.findById(clubId).populate('mod').populate('members')

  if (!club) {
    throw new Error('Could not find club')
  }

  club.members.push(user)

  await club.save()

  return club
}

module.exports = {
  createClub,
  getClubById,
  getUserClubs,
  addUserToClub,
  club: daos.Club
}
