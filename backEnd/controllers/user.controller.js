import mongoose from "mongoose"
import { User } from "../models/user.models.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateaccssandRefreshoken = async(userid)=>{
    try {
        const user = await User.findById(userid)
        const refreshToken = user.generateaccesstoken()
        const accesstoken= user.generateRefreshtoken()
    
        user.refreshToken = refreshToken
    
        await user.save({validateBeforeSave: false})
        console.log(accesstoken)
        return {accesstoken,refreshToken}
    } catch (error) {
        console.log("error while crea5ting thye tokens", error)
        throw new Error("error whil,e creatimng token");
        
    }
}

const registerUser =async (req,res)=>{
    const{username, email, fullName, password,avatar,messages} = req.body
    
    if ([username, fullName, email, password,avatar].some((field) => field?.trim() === "")) {
        return res.status(400).json({ error: "The required fields are missing" });
    }

    try {
        const esistedUser = await User.findOne({
            $or:[{username},{email}]
        })
    
    
        if (esistedUser) {
            return res.status(409).json({ error: "User already exists" });
        }
        
        const encrypted_pass= await bcrypt.hash(password,10) 
        console.log
        const user = await User.create({
            userName:username,
            fullName,
            password:encrypted_pass,
            messages,
            email:email
        })
    
        const createdUser=  User.findById(user._id)
    
        if (createdUser) {
            return res.status(200).json({ message: "User created successfully", user })
            
        }
    } catch (error) {
        console.log(error)
        return res.status(409).json({error:"error while creating user"})
    }
}

const loginUser= async(req, res)=>{
    //get email and pass
    //match with email and pass
    //send cookies
    try {
        const {email, password} = req.body  
    
        if (!email && !password) {
            return res.status(400).json({ error: "email password not destructuring from req.body" })
        }
    
        const user = await User.findOne(
            {
                email
            }
        )
    
        if (!user) {
            return res.status(400).json({error: "no user found"})
        }
    
        const encrypted_pass = user.password
    
        const result =await bcrypt.compare(password,encrypted_pass)
    
        if (!result) {
            return res.status(400).json({error: "invalid password "})
        }
    
        const tokens = await generateaccssandRefreshoken(user._id)
        console.log(tokens)
        const LoggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
        const options = {
            httpOnly: true,
            secure: true,
            sameSite:'None'
        }
    
        return res.status(200)
        .cookie("accessToken",tokens.accesstoken,options)
        .cookie("refreshToken",tokens.refreshToken,options)
        .json({message:`user logged successfully ${user.fullName} `,LoggedInUser})  
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'problem with full login :)'})
    }

}

const refreshAccesstoken = async(req,res)=>{
    const incomingToken= req.body.token
    if(!incomingToken){
        return res.status(400).json({error:"no teken found"})
    }
    const decodedToken= await jwt.verify(incomingToken,'this is our access token secerret')
    console.log(decodedToken)
    return res.status(200).json({"message":decodedToken})
}

const getDetails = async (req, res) => {
    console.log(req.user_obj)
    return res.status(200).json({user: req.user_obj })
}

const checkedLoggedin = async(req,res)=>{
    console.log(req.cookies)
    if(req.cookies.accessToken != null){

        return(res.status(200).json({loggedin:"true"}))
    }else{
        return(res.status(200).json({loggedin:"false"}))
    }
}

export {registerUser, getDetails, loginUser,refreshAccesstoken, checkedLoggedin}