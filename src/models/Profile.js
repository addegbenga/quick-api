const mongoose = require('mongoose')

const profileUserSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId
    },
    title: {
      type: String,
      default: ''
    },
    linkurl: {
      type: String,
      default: ''
    },
    published: {
      type: Boolean,
      default: false
    },
    test: {
      type: String
    },
    linkAvatar: {
      type: String
    },
    priority: false,
    views: {
      type: Number,
      default: 0
    }
  },
  { timeStamp: true }
)

module.exports = mongoose.model('Profile', profileUserSchema)
