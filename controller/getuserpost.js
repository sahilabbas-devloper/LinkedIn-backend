import post from "../Model/Postmodel.js"

const getuserpost = async(req,res) => {
     
    try {
         const posts =  await post.find({user: req.user.id})
      .sort({ createdAt: -1 })
     

      res.status(200).json({ success: true, posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
   

}

export default getuserpost