

import User from "../models/User.js";
import jwt from "jsonwebtoken";

 export const protect = async (req,res,next) => {
         const token = req.headers.authorization;
      if(!token){
        return res.status(401).json({
            status:"error",
            message:"No token provided"
        })
      }

      if(!token.startsWith("Bearer ")){
        return res.status(401).json({
            status:"error",
            message:"Invalid token format"
        })
      }
      const tokenString = token.split(" ")[1];
      const { id} = jwt.verify(tokenString,process.env.JWT_AUTH_SECRET_KEY);
      const user = await User.findById(id).select("-password");
      if(!user){
        return res.status(404).json({
            status:"error",
            message:'user not found'
        })
      }
      req.user = user;
      next();
}


