import post from "../Model/Postmodel.js"

const getposts = async(req,res) => {
     
    try {
         const posts =  await post.find()
        .populate("user", "username bio profilepic") 
      .sort({ createdAt: -1 })
     

      res.status(200).json({ success: true, posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
   

}

export default getposts