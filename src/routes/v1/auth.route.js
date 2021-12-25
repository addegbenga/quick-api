const express = require('express')

const router = express.Router()
const {
  registerUser,
  loginUser,
  getAuthUser,
  editUser,
  deleteLink,
  googleLogin
} = require('../../controllers/auth.controller')
const { auth } = require('../../middlewares/verify')

router.post('/register', registerUser)
router.post('/login', loginUser)

router.post('/google', googleLogin)

router.get('/me', auth, getAuthUser)

router.post('/edit', auth, editUser)

router.delete('/delete', auth, deleteLink)

module.exports = router
