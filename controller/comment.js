import post from "../Model/Postmodel.js"

const postcomment = async(req,res) => {

   try {
     const userid = req.user._id
    const postid = req.params.id
    const text = req.body.text


    const comment = {
        user: userid,
        text: text,
    }


    const commentpost = await post.findOneAndUpdate({_id: postid},
        {$push: {comments : comment }},
        {returnDocument: 'after'}
    ).populate("comments.user", "username profilepic")
   

    res.status(200).json(commentpost.comments)
   
   

   } catch (error) {
    console.log("comment post  error", error)
    res.status(500).json({message: "internal server error !"})
   }

}
export default postcomment