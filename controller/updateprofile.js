import fs from "fs"
import user from "../Model/Usermodel.js"
import cloudinary from "../utils/cloudinary.js"

const Updateprofile = async (req, res) => {
  try {
    const { name, bio, email, Location } = req.body;
    let profilepicurl = null;


    if (req.file) {
      const filepath = req.file.path
      const result = await cloudinary.uploader.upload(filepath, {
        folder: "userprofile"
      })
      profilepicurl = result.secure_url
      fs.unlink(filepath, (err) => {
        if (err) console.log("file delete error !", err)
      })
    }


    const updateFields = {};

    if (name) updateFields.username = name;
    if (bio) updateFields.bio = bio;
    if (email) updateFields.email = email;
    if (Location) updateFields.Location = Location;
    if (profilepicurl) updateFields.profilepic = profilepicurl;

    const clint = await user.findOneAndUpdate(req.user._id, {
      $set: updateFields
    })

    res.status(201).json({ message: "profile updated successfully." })

  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log("file delete error !", err)
      })
    }
    console.log(error)
    res.status(500).json({ message: "internal error !" })
  }
}

export default Updateprofile