import post from "../Model/Postmodel.js"

const deletepost = async (req,res) => {

    try {
        const id = req.params.postId
        const oldpost = await post.deleteOne({_id : id})

        res.status(200).json({message: "Post Deleted Sucessfully .", oldpost})

      
    } catch (error) {
        console.log("deletes post error ..!", error)
        res.status(500).json({message: "Post not deleted..!"})

    }
}

export default deletepost
    