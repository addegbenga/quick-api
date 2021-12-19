const express = require('express')
const router = express.Router()
const {
  createLink,
  updateLink,
  getProfile
} = require('../../controllers/profile.controller')
const { auth } = require('../../middlewares/verify')

router.post('/edit', updateLink)
router.post('/create', auth, createLink)
router.get('/get_profile', auth, getProfile)

module.exports = router
