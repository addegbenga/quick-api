const express = require('express')
const router = express.Router()
const {
  createLink,
  updateLink
} = require('../../controllers/profile.controller')
const { auth } = require('../../middlewares/verify')

router.post('/edit', updateLink)
router.post('/create', auth, createLink)

module.exports = router
