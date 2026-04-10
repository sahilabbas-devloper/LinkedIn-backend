import post from "../Model/Postmodel.js"
import { creatnotification } from "./notification.js"

const likeunlikepost = async (req, res) => {

    try {
        const postid = req.params.id
        const userid = req.user._id

        const foundpost = await post.findById(postid)

        if (!foundpost) {
            return res.status(404).json({ message: "Post not found !" })
        }

        const isliked = foundpost.likes.includes(userid)

        if (isliked) {
            await post.findByIdAndUpdate(postid, { $pull: { likes: userid } })
        } else {
            await post.findByIdAndUpdate(postid, { $push: { likes: userid } })
            await creatnotification(foundpost.user, userid, "like",postid)
        }

        const updatedpost = await post.findById(postid)
        res.status(200).json(updatedpost.likes)

        
    } catch (error) {
        console.log("likes error :", error)
        res.status(500).json({ message: "internal server error !" })
    }

}

export default likeunlikepost