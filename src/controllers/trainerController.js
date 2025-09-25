import Trainer from "../models/Trainers.js";


export const createTrainers = async (req,res) =>{
    try{
       const {name,qualification,expertise,specialization,introMessage} = req.body;
         
         const trainer = new Trainer({
              name,
             qualification,
              expertise,
             specialization,
            introMessage,
          photo: req.files.photo ? req.files.photo[0].path : "",
         introVideo: req.files.introVideo ? req.files.introVideo[0].path : "",
  });
   await trainer.save();
   console.log(trainer)
    
   res.status(201).json({
     status:"success",
     message:"create trainer successfully",
     trainer,
   })
  
    }catch(err){
        res.status(400).json({
             status:"error",
             message: "failed"
        })
    }
};
// get all trainer 
 export const getAllTrainers = async(req,res) =>{ 
    const trainers = await Trainer.find(); 
    res.status(200).json({ 
        status:"success", 
        message:"trainers fetched successfully",
         trainers
 }) };
 

export const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body;  

    const trainer = await Trainer.findByIdAndUpdate(id, updates, {new: true, runValidators: true,  });
    if (!trainer) {
      return res.status(404).json({
        status: "error",
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Trainer updated successfully",
      trainer,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//add review   
export const addreview = async(req,res) =>{
    try{
      const { id } = req.params;
      const { rating,comment} = req.body;
      const trainer = await Trainer.findById(id);
        if(!trainer){
            return  res.status(404).json({
                 status:"error",
                 message:"Trainer not found"
              })
        }
        trainer.reviews.push({user: req.user._id,rating,comment});
        await trainer.save();
         res.status(201).json({
           status:"success",
           message:"Review added successfully",
           trainer
         })

    }catch(err){
        res.status(400).json({
             status:"error",
             message: err.message
        })
    }
}
// response to review
export const respondToReview = async (req,res) =>{
     try{
       const { id ,reviewid} = req.params;
       const { response } = req.body;
       

      const trainer = await Trainer.findById(id);
        if(!trainer){
            return  res.status(404).json({
                 status:"error",
                 message:"Trainer not found"
              })
        }
        const review = trainer.reviews.id(reviewid);
        if(!review){
            return  res.status(404).json({
                 status:"error",
                 message:"review not found"
              })
            }
        review.trainerResponse = response;
        await trainer.save();
        res.status(200).json({
           status:"success",
           message:"Response added ",
           review
        })
     }catch(err){
         res.status(400).json({
             status:"error",
             message:err.message
        })
     }
}
