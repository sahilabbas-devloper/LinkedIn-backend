import express from "express"
import cors from "cors"
import route from "./Route/userroute.js"
import dotenv from "dotenv"
dotenv.config()
import DBconnect from "./DB.config/dbconnection.js"
import cookieParser from "cookie-parser"
import router from "./Route/notificationroute.js"




const app = express()
app.use(cors(
    {
        origin: ["http://localhost:5173","https://linked-frontend.vercel.app/Login"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "authorization"]
    }
)) 

app.use(express.json())
app.use(cookieParser())


// database connection
DBconnect()



app.use("/api", route)
app.use("/api/notification", router)



const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log("server is running on PORT ", PORT)
})