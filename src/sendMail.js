// backend/routes/sendEmail.js
import express from 'express'
import axios from "axios";
const router = express.Router();

const adminEmail = "blackdev504@gmail.com";

router.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "SY TITAN",
          email: {email},
        },
        to: [{ adminEmail }],
        subject,
        htmlContent: `<p>${message}</p>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ success: true, message: "Email sent successfully", data: response.data });
  } catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

export default router;
