import { Router } from "express";
import { createClass, filterClasses, getAllClasses, recommendClasses } from "../controllers/classController.js";
import {  protect } from "../middlewares/authMiddleware.js";
import { authorise } from "../middlewares/authorizeRole.js";




const classRoutes = Router();



classRoutes.post("/",protect,authorise("trainer"),createClass);
classRoutes.get("/",getAllClasses);
classRoutes.get("/filter",filterClasses);
classRoutes.get("/recommend/:userId",recommendClasses)

export default classRoutes;