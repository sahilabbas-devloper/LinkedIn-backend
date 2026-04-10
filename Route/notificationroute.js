import express from "express"
import verify from "../middleware/verification.js"
import {getnotification} from "../controller/notification.js"

const router = express.Router()  

router.get("/send", verify, getnotification)

export default router