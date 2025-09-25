import { Router } from "express";
import { forgotpassword, resetpassword } from "../controllers/resetController.js";



const resetRoutes = Router()

resetRoutes.post("/forgot-password",forgotpassword);
resetRoutes.post("/reset-password/:token",resetpassword)

export default resetRoutes;