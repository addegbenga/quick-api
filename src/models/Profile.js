const mongoose = require("mongoose");

const profileUserSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
    },
    linkurl: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    linkAvatar: {
      type: String,
    },
    linkAvatarId: {
      type: String,
    },
    priority: false,
    views: {
      type: Number,
      default: 0,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Profile", profileUserSchema);
