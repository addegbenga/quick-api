/* eslint-disable quotes */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const opts = { toJSON: { virtuals: true } };
const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    bio: {
      type: String,
      default: "my bio",
    },
    phone: String,
    avatarUrl: {
      type: String,
      default:
        "https://ik.imagekit.io/f3d9lmxlhe59/default-profile-picture_gPdRK18Jb.png?ik-sdk-version=javascript-1.4.3&updatedAt=1645102494503",
    },
    avatarId: String,
    google: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: false,
  },
  opts,
  {
    timestamps: true,
  }
);

userModel.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "author",
  justOne: false,
});

// Encrypt password using bcrypt
userModel.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  if (this.password) {
    this.password = await bcrypt.hash(this.password, salt);
  }
});
// { document: true, query: false }).

// match user enterd user password

userModel.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

userModel.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2days",
    }
  );
};

module.exports = mongoose.model("User", userModel);
