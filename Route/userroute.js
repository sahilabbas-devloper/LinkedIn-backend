import  { Router } from "express"
import signin from "../controller/signin.js"
import login from "../controller/login.js"
import verify from "../middleware/verification.js"
import profile from "../controller/profile.js"
import Signout from "../controller/Signout.js"
import create from "../controller/post.js"
import upload from "../middleware/multer.js"
import getposts from "../controller/getposts.js"
import getuserpost from "../controller/getuserpost.js"
import Updateprofile from "../controller/updateprofile.js"
import deletepost from "../controller/Deletepost.js" 
import likeunlikepost from "../controller/postslike.js"
import likeLimiter from "../middleware/likelimiter.js"
import postcomment from "../controller/comment.js"

const route = Router()  

route.post("/rajister", signin)
route.post("/Login", login)
route.get("/profile",verify, profile)
route.post("/Signout", Signout)
route.post("/create", verify, upload.single('myimg'), create)
route.get("/getposts", getposts)
route.get("/userpost", verify , getuserpost)
route.put("/Update", verify ,upload.single('myimg'), Updateprofile)
route.delete("/Deletepost/:postId", verify , deletepost)
route.post("/posts/:id/like", verify ,likeLimiter,likeunlikepost)
route.post("/posts/:id/comments", verify ,postcomment)
export default route