import bcrypt from "bcryptjs"
import user from "../Model/Usermodel.js"

const signin =  async(req, res) => {
       const { name, email, passward, bio, profilepic } = req.body;
   
      try {

            if (!name || !email || !passward) {
              return
              res.status(400).json({message:"All field required"})
            }

            const emailcheck = await user.findOne({email})

            if (emailcheck) {
              return
              res.status(400).json({message:"account are already exiests."})
           }

              const hash = await bcrypt.hash(passward, 10)
              const users = await user.create(

                     {
                            username: name,
                            email: email,
                            passward: hash,
                            bio: bio,
                            profilepic: profilepic,
                     }
              )
              res.status(201).json({message: "Sign up Sucessfully."})


       } catch (error) {
              console.log("sign up data save error", error)
              res.status(500).json({message: "internal sever error."})
       }
}

export default signin