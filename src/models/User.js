import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
     password: {
        type :String,
        required:true
    },
    role:{
        type:String,
        enum:["user","trainer"],
        default:"user"
    },
    fitnessGoals:{
        type:String
    },
    

},{timestamps:true});

const User = model("User",userSchema);
export default User;