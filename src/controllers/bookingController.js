import Booking from "../models/Booking.js";
import Class from "../models/Class.js";
import { sendEmail } from "../services/sendEmail.js";


export const createbooking = async(req,res) => {
        try{
              const { classId ,date} = req.body;
              if(!classId || !date) {
                return res.status(400).json({
                    status:"error",
                    message:"classId and date are required"
                })
              }
            const classDoc = await Class.findById(classId);
            if(!classDoc){
                return res.status(404).json({
                    status:"error",
                    message:"class not found"
                })
            }
            const trainerId = classDoc.trainer;
            const bookingDate = new Date(date);

            const conflict = await Booking.findOne({class:classId,date:bookingDate});
            if(conflict){
                return res.status(400).json({
                     status:"error",
                     message:"This class slot is already booked.."
                })
            }
            const booking = new Booking({
                 user:req.user._id,
                 trainer: trainerId,
                 class:classId,
                  date:bookingDate
            })
            await booking.save();
            res.status(201).json({
             status:"success",
             message:"Booking created",
             booking
        })

         await sendEmail(
               req.user.email,
         "Booking confirmed",
         ` <p> Dear ${req.user.name}</p>
          <p> Your booking for ${classDoc.title} on  ${bookingDate.toLocaleString()}  is confirmed </p>
           <p>  thank you for booking fitness classes </p>
             <p>  we wil you give best always  </p>
                          <p> thanking you </p>`
      );
   
        
        }catch(err){
               res.status(500).json({ message: err.message});
        }
}

export const getmybooking = async(req,res) =>{
      try {
    const bookings = await Booking.find({ user: req.user.id }).populate("class trainer");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const reschedule = async(req,res) =>{
           try{
               const bookingId = req.params.id;
               const { newDate }  = req.body;
               if(!newDate){
                  return res.status(400).json({
                           message:"newDate is required"
                  })
               }
               const booking = await Booking.findById(bookingId);
               if(!booking){
                 return res.status(404).json({
                    message:"Booking not found"
                 })
               }
               if(booking.user.toString() !== req.user.id){
                 return res.status(403).json({ message:"you can only reschedule your booking"})
               }
               const newDateObj = new Date(newDate);
                const clash = await Booking.findOne({
                    class:booking.class,
                    date:newDateObj,
                    _id: {$ne: booking._id}
                })
                 if (clash) return res.status(400).json({ message: "This class slot is already booked." });

                booking.date = newDateObj;
                 booking.status = "rescheduled";
                await booking.save();
                 res.status(201).json({
             status:"success",
             message:"Booking rescheduled",
             booking
        })

                 await sendEmail(
               req.user.email,
         "Booking Rescheduled",
         ` <p> Dear ${req.user.name}</p>
                <p>Your booking has been rescheduled to ${newDateObj.toLocaleString()}
                              <p>      thank you for booking fitness classes </p>
             <p>                         we wil you give best always  </p>
                          <p> thanking you </p>`
      );
   
           }catch(err){
                 res.status(500).json({ message: "Server error", error: err.message });
  
           }
};

export const cancel = async(req,res) =>{
      try{
           const bookingId = req.params.id;
            const booking = await Booking.findById(bookingId).populate("class");
          if (!booking) return res.status(404).json({ message: "Booking not found" });

            if(booking.user.toString() !== req.user.id){
                 return res.status(403).json({ message:"you can only cancel your booking"})
               }
            await Booking.findByIdAndDelete(bookingId);
             res.status(201).json({
             status:"success",
             message:"Booking cancelled",
             booking
        })
              await sendEmail(
               req.user.email,
         "Booking cancelled",
         ` <p> Dear ${req.user.name}</p>
                Your booking fro ${booking.class?.title || "class"}
                on ${booking.date.toLocaleString()} has been cancelled.`
      );
   
       
      }catch(err){
             res.status(500).json({ message: "Server error", error: err.message });
  
      }
};
 
