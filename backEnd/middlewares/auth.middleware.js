import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'

export const verifyJWT = async (req, res, next) => {
    console.log("this is from verifyJWT")
    const token = req.cookies.accessToken
    console.log(token)
    if (!token) {
        console.log('no token received  ')
        return res.status(400).json({ error: "no token received" })
    }

    try {
        console.log(token)
        const decodedToken = jwt.verify(token, 'this is our access token secerret')
        console.log(decodedToken)
        const findUser = await User.findById(decodedToken._id).select("-password -refreshToken")
        console.log(findUser)
        if (!findUser) {
            return res.status(404).json({ error: "User not found" })
        }
    
        req.user_obj = findUser
        next()  // Proceed to the next middleware

    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" })
    }
}