import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import user from "../Model/Usermodel.js"

dotenv.config()

const verify = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Login requried !" })
    } else {

        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const currentuser = await user.findById(decoded.id).select("-passward")


            if (!currentuser) {
                return res.status(401).json({ message: "user not found !" })
            }


            req.user = currentuser

            next()

        } catch (error) {

            console.log("auth middleware error", error)

            return res.status(401).json({ message: "not authorized token failed !" })
        }

    }
}

export default verify