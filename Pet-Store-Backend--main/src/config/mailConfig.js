const nodemailer = require('nodemailer');

// Create a transporter object with the necessary email service configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'MrCoder105@gmail.com',
    pass: 'exjpfyeodlrctvdb',
  },
  port: 465, // or 587 if using TLS encryption
  secure: true, // true for SSL encryption, false for TLS encryption
});

module.exports = transporter;
