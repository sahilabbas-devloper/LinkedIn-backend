import jwt from "jsonwebtoken"
import user from "../Model/Usermodel.js"
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
dotenv.config()


const login = async (req, res) => {
    const { username, passward } = req.body;

    try {

        if (!username || !passward) {
            return res.status(400).json({ message: "plz all feild requried.!" })
        }

        const olduser = await user.findOne({ username })

        if (!olduser) {
            return res.status(400).json({ message: "User not found.!" })
        } else {
            const pas = await bcrypt.compare(passward, olduser.passward)
            if (!pas) {
                return res.status(400).json({ message: "Passward incorrect !" })
            } else {
                const token = jwt.sign({ id: olduser._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY })

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 24 * 60 * 60 * 1000
                })

                res.status(200).json({ message: "Sucessfully Login.", user })
            }
        }

    } catch (error) {
        console.log("data login error ", error)
        res.status(500).json({ message: "enternal server error" })
    }

}

export default login