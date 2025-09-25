import { Router } from "express";
import { payment } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";


const paymentRoutes = Router();

paymentRoutes.post("/process-payment",protect,payment)

export default paymentRoutes;