import mongoose from "mongoose"

const Userschema = mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique:true,
    },
     passward:{
        type: String,
        require: true,
    },
    Location: {
        type: String,
        default: "",
    },
    

    bio:{
        type: String,
        default: "",
    },
    profilepic:{
        type: String,
         default: "",
      
    },
},{timestamps:true})

const user = mongoose.model("User",Userschema)

export default user