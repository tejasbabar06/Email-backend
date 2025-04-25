// Import necessary modules
import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';  // Import CORS

// Initialize Express app
const app = express();
const port = 3000;

// Use CORS for all routes (Allow all domains)
app.use(cors()); // This will allow all domains to access your server

// Middleware for parsing incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email sending function
const sendEmail = async (subject, name, email, content) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'test93224316@gmail.com',
      pass: 'jqcjmsvxfcfubtzd', // App Password (You can generate one in Gmail)
    },
  });

  let mailDetails = {
    from: 'test93224316@gmail.com',
    to: 'tejasbabar335@gmail.com', // Your fixed email address
    subject: subject,
    text: `Message from: ${name} <${email}>\n\n${content}`,
  };

  try {
    await mailTransporter.sendMail(mailDetails);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.log('Error Occurs: ' + error);
    return false;
  }
};

// Route to handle form submission
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const isSuccess = await sendEmail(subject, name, email, message);

  if (isSuccess) {
    return res.status(200).json({ message: 'Email sent successfully!' });
  } else {
    return res.status(500).json({ message: 'Failed to send email!' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
