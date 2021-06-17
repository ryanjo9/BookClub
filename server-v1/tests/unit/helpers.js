const getLoginCookie = async (request, user) => {
  const response = await request
    .post('/api/users/login')
    .send({
      username: user.username,
      password: user.password
    })

  return response.headers['set-cookie']
}

module.exports = {
  getLoginCookie
}
