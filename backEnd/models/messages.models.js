import mongoose, {Schema} from "mongoose";

const msgSchema = new Schema({
    msg:{
        type:String,
        required:true
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    
},{timestamps:true})

export const Msg= mongoose.model("Msg",msgSchema)