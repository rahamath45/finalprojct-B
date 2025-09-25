import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const Register = async (req,res)=>{
     try{
        const{ email,name,password,fitnessGoals,role} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                status:"error",
                message:"user already exists with this email",
                data:{
                    name: user.name,
                    email: user,email,

                }
            })
        }
        
        const salt = await bcrypt.genSalt(Number(process.env.ENCRYPT_SALT_ROUNDS));
        const hashedpassword = await bcrypt.hash(password,salt);

         const token = jwt.sign({
                id:user._id ,role:user.role
        },process.env.JWT_AUTH_SECRET_KEY,{expiresIn: "7d"});

        const newUser = new User({
            name,
            email,
            password:hashedpassword,
            fitnessGoals,
            role,
            token
        });
        await newUser.save();
        res.status(201).json({
            status:"success",
            message:"user registered successfully",
            data:newUser,
        })
     }catch(err){
        console.log(err)
     }
}

export const Login = async  (req,res)=>{
     try{
        const { email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                   status:"error",
                   message:"user does not exists with this email",
                   data:{
                    email
                   }
            })
        }
        const ispasswordvalid = await bcrypt.compare(
            password,user.password
        );
        if(!ispasswordvalid){
                return res.status(400).json({
                    status:"error",
                    message:"INVALID PASSWORD",
                    data:{
                        email
                    }
                });
        }
        const token = jwt.sign({
                id:user._id ,role:user.role
        },process.env.JWT_AUTH_SECRET_KEY,{expiresIn: "7d"});

        res.status(200).json({
            status:"success",
            message:"user logged in successfully",
            data:{
                token,
                user
            }
        })

     }catch(err){
        console.log(err)
     }
}