
import post from "../Model/Postmodel.js"
import cloudinary from "../utils/cloudinary.js"

const create = async (req, res) => {
    try {
        const { content } = req.body;
        const userID = req.user._id;



        if (!req.file) {
            return res.status(400).json({ message: "Image required!" })
        }


        // cloudinary upload ..
        const result = await new Promise((resolve , reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {folder: "posts"},
                (error,result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            )
            stream.end(req.file.buffer);
        })
     

        // creating a post ..
        const yourpost = await post.create({
            user: userID,
            img: result.secure_url,
            text: content,
        })

        res.status(201).json({ message: "post created sucessfully." })

    } catch (error) {

        res.status(500).json({ message: "enternal error !" })
    }

}
export default create