const express = require('express')
const router = express.Router()

const defaultRoute = [
  {
    path: '/auth',
    route: require('./auth.route')
  }
]

defaultRoute.map((route) => {
  return router.use(route.path, route.route)
})

module.exports = router
