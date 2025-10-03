import nodemailer from "nodemailer";

export const sendEmail = async (to,subject,html)=>{
      
  comsole.log()
  const transporter = nodemailer.createTransport({
        service:"gmail",
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