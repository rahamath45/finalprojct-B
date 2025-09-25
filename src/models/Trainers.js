import { model, Schema } from "mongoose";


const reviewSchema = Schema({
     user : {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     rating:{
        type:Number,
        min:1,
        max:5,
        required:true
     },
     comment:{
        type:String,
         required:true
     },
     createdAt:{
         type:Date,
         default:Date.now
     },
     trainerResponse:{
        type:String
     }
});

const trainerSchema = Schema({
    name:{
        type:String,required:true
    },
    qualification:{
         type:String,required:true
    },
    expertise:{
         type:String,required:true
    },
    specialization:{
         type:String,required:true
    },
    photo:{type:String},
     introVideo: { type: String },
     introMessage: { type: String },
     reviews: [reviewSchema],
},{timestamps:true});

const Trainer = model("Trainer",trainerSchema);
export default Trainer;