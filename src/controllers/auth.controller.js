/* eslint-disable camelcase */
const User = require('../models/User')
const { sendTokenResponse } = require('../middlewares/utils')
const bcrypt = require('bcryptjs')

const { google } = require('googleapis')
const ImageKit = require('imagekit')

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_END_POINT
})

const client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID)

exports.registerUser = async (req, res) => {
  try {
    const { ...args } = req.body
    const email = await User.findOne({ email: args.email })
    if (email) {
      return res.status(400).json('User with that email already exist')
    }
    await User.create(args)
    return res.json({ msg: 'account succesfully created' })
  } catch (error) {
    return res.status(500).json(error + 'Something went wrong')
  }
}

// login user locally
exports.loginUser = async (req, res) => {
  const { ...args } = req.body
  try {
    const user = await User.findOne({ email: args.email }).select('+password')
    if (!user) {
      return res.status(400).json('No user with this account found')
    }

    // check if password matches
    let isMatch
    if (user.password) {
      isMatch = await user.matchPassword(args.password)
    }

    if (!isMatch) {
      return res.status(400).json('invalid credentials')
    }
    sendTokenResponse(user, 200, res)
  } catch (err) {
    res.status(500).send(err + ' Server error')
  }
}

exports.getAuthUser = async (req, res) => {
  try {
    return res.json(req.user)
  } catch (error) {
    return res.json(error)
  }
}
// google login
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body

    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    console.log(verify)
    const { email_verified, email } = verify.payload

    if (!email_verified) {
      return res.status(400).json({ msg: 'Email verification failed.' })
    }

    const user = await User.findOne({ email })

    if (user) {
      sendTokenResponse(user, 200, res)
    } else {
      const newUser = await User.create({ email, google: true })
      sendTokenResponse(newUser, 200, res)
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.editUser = async (req, res) => {
  const { ...args } = req.body
  const salt = await bcrypt.genSalt(10)
  const newpassword = await bcrypt.hash(args.password, salt)

  try {
    if (req.files) {
      const url = await imagekit.upload({
        file: req.files.image.data,
        fileName: req.files.image.name
      })

      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: {
            name: args.name,
            password: newpassword,
            phone: args.phone,
            bio: args.bio,
            avatarUrl: url.url
          }
        },
        { new: true }
      )

      return res.json({
        msg: 'Profile updated',
        data: user
      })
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          name: args.name,
          password: newpassword,
          phone: args.phone,
          bio: args.bio
        }
      },
      { new: true }
    )

    return res.json({
      msg: 'Profile updated',
      data: user
    })
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}
