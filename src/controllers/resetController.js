import jwt from "jsonwebtoken"
import { sendEmail } from "../services/sendEmail.js";
import User from "../models/User.js";
import bcrypt  from "bcryptjs";
import dotenv from "dotenv";
dotenv.config()


export const forgotpassword = async (req,res) =>{
       const { email } = req.body;
       try{
         const user = await User.findOne({email});
         if(!user){
              return res.status(400).json({
                status:"error",
                message:"user not found",
            })
         }
        const token = jwt.sign(
                 { id: user._id },
                process.env.JWT_AUTH_SECRET_KEY,
                  { expiresIn: "15m" }
               );

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
           res.status(200).json({
  status:"success", 
  message:"password reset link sent to email",
  token
});

// 2️⃣ send email in background
sendEmail(
  user.email,
  "Password reset",
  `<p>You requested a password reset</p>
   <p>Click <a href="${resetLink}">here</a> to reset your password</p>`
)
  .then(() => console.log("✅ Email sent successfully"))
  .catch(err => console.error("❌ Email failed:", err.message));
       }catch (err) {
        res.status(500).json({ error: "not send email" + err.message });
    }
};

export const resetpassword = async (req,res) =>{
  const { token } = req.params;
  const { password } = req.body;

 
    // ✅ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET_KEY);

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(400).json({
          status:"error",
         message: "User not found" 
        });
    }
    // Hash new password
       const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        
        res.status(200).json({
            status:"success",
            message:"user logged in successfully",
            data:{
                token
            }
        })
 
}