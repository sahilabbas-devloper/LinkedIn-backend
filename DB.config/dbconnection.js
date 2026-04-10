import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const DBconnect = async() => {

    try {
        const value = await mongoose.connect(`${process.env.MONGODB_URL}${process.env.DB_NAME}`)
        console.log("mongoDB connected.")
    } catch (error) {
        console.log("mongodb connection error..",error)
        process.exit(1)
    }
    
}

export default DBconnect