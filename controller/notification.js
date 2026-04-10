import Notification from "../Model/notificationmodel.js"
import user from "../Model/Usermodel.js"


export const creatnotification = async (recipient, sender,type,post) => {
 try {
    if (recipient.toString() === sender.toString()) return
    
    await Notification.create({
        recipient,
        sender,
        type,
        post

    })
        
 } catch (error) {
    console.log("notification error",error)
 }
}



 export const getnotification = async (req,res) => {


    try {
   
    const notification = await Notification.find({
        recipient: req.user._id
    })
    .populate("sender" , "username profilepic")
    .sort({createdAt: -1})
    .limit(20)
    
    res.status(200).json(notification)
 } catch (error) {
    console.log("notification error",error)
        res.status(500).json({ message: "internal error !" })
 }
}

