const express = require('express')
const router = express.Router()

const defaultRoute = [
  {
    path: '/auth',
    route: require('./auth.route')
  },
  {
    path: '/profile',
    route: require('./profile.route')
  },
  {
    path: '/user',
    route: require('./users.route')
  }
]

defaultRoute.map((route) => {
  return router.use(route.path, route.route)
})

module.exports = router
