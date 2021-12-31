const User = require('../models/User')

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    return res.json(user)
  } catch (error) {
    console.log(error)
  }
}
