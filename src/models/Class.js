import { model, Schema } from "mongoose";


const classSchema = Schema({
    trainer: {
         type: Schema.Types.ObjectId,
         ref: "User",
          required: true },
       title: { 
        type: String, 
        required: true 
    },
      type: { type: String, 
        enum: ["Yoga", "Strength", "Cardio"], 
        required: true 
    },
    duration: Number, // in minutes
    schedule: [{ date: Date }],
    description: String
}, { timestamps: true });

const Class = model("Class",classSchema);
export default Class;
