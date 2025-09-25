import { Router } from "express";
import multer from "multer";
import path from "path";
import { addreview, createTrainers,  getAllTrainers,  respondToReview, updateTrainer } from "../controllers/trainerController.js";
import { authorise } from "../middlewares/authorizeRole.js";
import {  protect } from "../middlewares/authMiddleware.js";





const trainerRoutes = Router();

const storage = multer.diskStorage({
     destination:(req,file,cb)=> cb(null,"uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const uploads = multer({storage});

trainerRoutes.use(protect)
// create trainer 
trainerRoutes.post("/",uploads.fields([{ name:"photo"},{name:"introVideo"}]),authorise("trainer"),createTrainers);
// get update
trainerRoutes.put("/:id",authorise("trainer"), updateTrainer);

// get all trainer
trainerRoutes.get("/",getAllTrainers)

// add review
trainerRoutes.post("/:id/review",authorise("user"),addreview);

// review response
trainerRoutes.post("/:id/reviews/:reviewid",authorise("trainer"),respondToReview)
export default trainerRoutes;