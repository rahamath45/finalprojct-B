import { Router } from "express";
import { Login, Register } from "../controllers/authController.js";



const authRoutes = Router();

authRoutes.post("/register",Register);
authRoutes.post("/login",Login);

export default authRoutes;