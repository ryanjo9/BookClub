const schemas = require('./schemas')

const createClub = async (club, user) => {
  const dbClub = new schemas.Club({
    ...club,
    createdBy: user
  })

  await dbClub.save()

  return dbClub
}

const joinClub = async (clubId, user) => {
  const update = { $push: { members: user } }
  const options = { new: true, upsert: true }

  return schemas.Club.findByIdAndUpdate(clubId, update, options).populate('members').populate('mods').populate('books').populate('createdBy')
}

const getClubById = async (id) => {
  return schemas.Club.findById(id).populate('members').populate('mods').populate('books').populate('createdBy')
}

const getUserClubs = async (user) => {
  return schemas.Club.find({
    members: {
      $in: [user]
    }
  }).populate('mods').populate('members').populate('books').populate('createdBy')
}

const addBookToClub = async (clubId, book) => {
  const update = { $push: { books: book } }
  const options = { new: true, upsert: true }

  return schemas.Club.findByIdAndUpdate(clubId, update, options)
}

const deleteClub = async (club) => {

}

module.exports = {
  createClub,
  joinClub,
  getClubById,
  getUserClubs,
  addBookToClub,
  deleteClub
}
