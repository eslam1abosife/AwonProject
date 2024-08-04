const express = require("express");
const axios = require("axios");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const app = express();
app.use(express.json());
// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
        user: "Awn_Inf@outlook.com",
        pass: "awnVue1298$", // Set your Yahoo email password here
    },
});
// Endpoint to send email
app.post("/send-email", async (req, res) => {
    const { email } = req.body;
    const mailOptions = {
        from: "Awn_Inf@outlook.com",
        to: email,
        subject: "Password Reset",
        text: "Your password reset link here.",
    };
    try {
        await transporter.sendMail(mailOptions);
        res.send("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
    }
});
// Endpoint to send WhatsApp message
app.post("/send-whatsapp", async (req, res) => {
    const { phone } = req.body;
    const accountSid = "";
    const authToken = "";
    const client = new twilio(accountSid, authToken);
    try {
        await client.messages.create({
            body: "Your WhatsApp message here.",
            from: "whatsapp:+14155238886", // Twilio sandbox number
            to: `whatsapp:${phone}`,
        });
        res.send("WhatsApp message sent successfully!");
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        res.status(500).send("Error sending WhatsApp message");
    }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
