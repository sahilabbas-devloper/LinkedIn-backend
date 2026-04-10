import fs from "fs"
import post from "../Model/Postmodel.js"
import cloudinary from "../utils/cloudinary.js"

const create = async (req, res) => {
    try {
        const { content } = req.body;
        const userID = req.user._id;



        if (!req.file) {
            return res.status(400).json({ message: "Image required!" })
        }


        const filepath = req.file.path


        // cloudinary upload ..
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "posts"
        })

        // temp file deleted ..
        await fs.promises.unlink(filepath)

        // creating a post ..
        const yourpost = await post.create({
            user: userID,
            img: result.secure_url,
            text: content,
        })

        res.status(201).json({ message: "post created sucessfully." })

    } catch (error) {

        await fs.promises.unlink(req.file.path).catch(() =>{})
        console.log(error)

        res.status(500).json({ message: "enternal error !" })
    }

}
export default create