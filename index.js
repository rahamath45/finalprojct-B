import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorhandler from "./src/middlewares/errorhandler.js";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import trainerRoutes from "./src/routes/trainerRoutes.js";
import resetRoutes from "./src/routes/resetRoutes.js";
import classRoutes from "./src/routes/classRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
         origin: "https://fitnessfinal.netlify.app", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth",authRoutes);
app.use("/api/reset",resetRoutes);
app.use("/api/trainers",trainerRoutes);
app.use("/api/classes",classRoutes);
app.use("/api/booking",bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.use(errorhandler);
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
      connectDB();
})
