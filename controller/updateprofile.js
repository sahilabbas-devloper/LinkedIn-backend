
import user from "../Model/Usermodel.js"
import cloudinary from "../utils/cloudinary.js"

const Updateprofile = async (req, res) => {
  try {
    const { name, bio, email, Location } = req.body;
    let profilepicurl = null;


    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "userprofile" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        stream.end(req.file.buffer);
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

    console.log(error)
    res.status(500).json({ message: "internal error !" })
  }
}

export default Updateprofile