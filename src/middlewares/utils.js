
// jwt token utils
const sendTokenResponse = (user, statuscode, res) => {
  const token = user.getSignedJwtToken()

  res.status(statuscode).json({
    msg: 'woah valid credentials',
    data: user,
    token
  })
}

module.exports = { sendTokenResponse }
