const Profile = require("../models/Profile");
const ImageKit = require("imagekit");
const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_END_POINT,
});

exports.createLink = async (req, res) => {
  const { ...args } = req.body;

  try {
    args.author = req.user.id;
    const newprofile = await Profile.create(args);
    return res.json({ data: newprofile });
  } catch (error) {
    console.log(error);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.find({ author: req.user.id });
    return res.json(profile);
  } catch (error) {
    console.log(error);
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.find({ author: req.body.id });
    return res.json(profile);
  } catch (error) {
    console.log(error);
  }
};
exports.updateLink = async (req, res) => {
  const { ...args } = req.body;
  try {
    if (req.files) {
      const url = await imagekit.upload({
        file: req.files.file.data,
        fileName: req.files.file.name,
      });
      const profile = await Profile.findOneAndUpdate(
        { _id: args.id },
        {
          $set: {
            linkAvatar: url.url,
            linkAvatarId: url.fileId,
          },
        },
        { new: true }
      );

      return res.json({
        msg: "Profile updated",
        data: profile,
      });
    } else {
      const profile = await Profile.findOneAndUpdate(
        { _id: args.linkId },
        {
          $set: {
            title: args.title,
            linkurl: args.linkurl,
            published: args.published,
          },
        },
        { new: true }
      );

      return res.json({
        msg: "Profile updated",
        data: profile,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const deleteId = await Profile.findByIdAndDelete({ _id: req.body.id });
    return res.json(deleteId);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteLinkImage = async (req, res) => {
  try {
    imagekit
      .deleteFile(req.body.linkAvatarId)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
    await Profile.findOneAndUpdate(
      { _id: req.body.linkId },
      {
        $set: {
          linkAvatar: "",
          linkAvatarId: "",
        },
      },
      { new: true }
    );
    return res.json("Image deleted succesfully");
  } catch (error) {
    console.log(error);
  }
};
