import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({

    recipient :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
     sender :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    type: {
        type: String,
        enum: ["like","comment"],
        required: true,
    },

     post: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        default: null
    },
    
    read: {
        type:Boolean,
        default: false
    }
    


},{timestamp: true})

const Notification = mongoose.model("notification", notificationSchema )

export default Notification