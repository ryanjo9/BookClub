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

const mapClub = (club) => {
  return {
    id: club._id,
    name: club.name,
    frequency: club.frequency,
    activeBook: club.activeBook,
    mod: mapUser(club.mod),
    members: club.members.map(mapUser),
    created: club.created
  }
}

module.exports = {
  mapClub,
  mapUser
}
