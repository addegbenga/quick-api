const express = require('express')
const router = express.Router()
const {
  getUserById
} = require('../../controllers/user.controller')

router.post('/userId', getUserById)
