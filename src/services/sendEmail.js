import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      html,
    });
    console.log("✅ Email sent:", to);
  } catch (err) {
    console.error("❌ Email failed:", err.response?.body || err.message);
  }
};
