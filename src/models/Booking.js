
import  { model, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    trainer: { 
      type: Schema.Types.ObjectId, 
      ref: "Trainer", 
      required: true 
    },
    class: { 
      type: Schema.Types.ObjectId, 
      ref: "Class", 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
    },
    status: {
      type: String,
      enum: ["booked", "rescheduled", "cancelled"],
      default: "booked",
    },
  },
  { timestamps: true }
);


bookingSchema.index({ class: 1, date: 1 }, { unique: true });

const Booking = model("Booking",bookingSchema);
export default Booking;