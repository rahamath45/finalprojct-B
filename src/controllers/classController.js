import Class from "../models/Class.js";
import User from "../models/User.js";

// Create class
export const createClass = async (req, res) => {
    try {
        const { title, type, duration, schedule, description } = req.body;
        const newClass = await Class.create({
            trainer: req.user._id,
            title, type, duration, schedule, description
        });
        res.status(201).json({
            status:"success",
            message:"create a class successfully",
            newClass
        });
    } catch(err){
        res.status(500).json({ message: err.message });
    }
};

// Get all classes with filters
// GET /api/classes/filter?type=yoga&duration=60&date=2025-09-25
export const filterClasses = async (req, res) => {
  try {
    const { type, duration, date } = req.query;

    let query = {};
    if (type) query.type = type;
    if (duration) query.duration = duration;
    if (date) query["schedule.date"] = new Date(date);

    const classes = await Class.find(query).populate("trainer", "name expertise");

    res.status(200).json({
      status: "success",
      results: classes.length,
      classes,
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

// GET /api/classes

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("trainer", "name expertise");
    res.status(200).json({
      status: "success",
      classes,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


// GET /api/classes/recommend/:userId



export const recommendClasses = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Example: recommend based on user.preference or last booking type
    const preferredType = user.fitnessGoals || "yoga"; 
 
    const recommended = await Class.find({ type: preferredType }).limit(5)
      .populate("trainer", "name expertise");
    res.status(200).json({
      status: "success",
      recommended,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
