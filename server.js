const express = require("express");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
require('dotenv').config();

// Enable CORS
app.use(cors());

// Serve static files from the current directory
app.use(express.static(__dirname));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Email,
    pass: process.env.Email_Password
  }
});

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      from: email,
      to: 'raed.guembri99@gmail.com',
      subject: `Portfolio New Contact Form Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
