import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorise } from "../middlewares/authorizeRole.js";
import { cancel, createbooking, getmybooking, reschedule } from "../controllers/bookingController.js";


const bookingRoutes = Router();

bookingRoutes.use(protect,authorise("user"))
// create booking
bookingRoutes.post("/",createbooking);
bookingRoutes.get("/me",getmybooking);
bookingRoutes.put("/:id/reschedule",reschedule);
bookingRoutes.delete("/:id",cancel)

export default bookingRoutes;