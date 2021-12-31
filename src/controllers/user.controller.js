const User = require('../models/User')

exports.getUserById = async (req, res) => {
  const name = req.params.name
  try {
    const user = await User.find({ username: name })
    return res.json(user)
  } catch (error) {
    console.log(error)
  }
}
