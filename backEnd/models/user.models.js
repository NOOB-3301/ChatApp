import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"


const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    refreshToken: {
        type: String
    },
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"Msg"
    }]
},{timestamps:true})

userSchema.methods.generateaccesstoken = function(){
    return (
        jwt.sign(
            {
               _id :this._id,
               username:this.userName,
               email:this.email,
               fullname:this.fullName
            },
            'this is our access token secerret',
            {
                expiresIn:'24h'
            }
        )
    )
}

userSchema.methods.generateRefreshtoken = function(){
    return(
        jwt.sign(
            {
                _id :this._id,
             },
             'this is our access token secerret',
             {
                 expiresIn:'240h'
             } 
        )
    )
}

export const User= mongoose.model("User",userSchema)