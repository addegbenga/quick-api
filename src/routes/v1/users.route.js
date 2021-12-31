const express = require('express')
const router = express.Router()
const { getUserById } = require('../../controllers/user.controller')

router.get('/:name', getUserById)

module.exports = router
