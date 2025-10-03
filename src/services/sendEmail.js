import nodemailer from "nodemailer";

export const sendEmail = async (to,subject,html)=>{
      

  const transporter = nodemailer.createTransport({
        service:"gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth:{
            user: process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
       })


       await transporter.sendMail({
              from:`"password reset <${process.env.EMAIL_USER}>"`,
              to,
              subject,
              html
       })
}