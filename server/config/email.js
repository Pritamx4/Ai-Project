// Email Configuration
const nodemailer = require('nodemailer');

/**
 * Create email transporter
 * Supports Gmail, Outlook, and other SMTP services
 */
const createTransporter = () => {
  // For Gmail, you need to:
  // 1. Enable 2-Step Verification in your Google Account
  // 2. Generate an "App Password" from Security settings
  // 3. Use that app password in EMAIL_PASSWORD
  
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail', // 'gmail', 'outlook', etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your app password
    },
  });
};

/**
 * Send email using configured transporter
 */
const sendEmail = async (mailOptions) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  createTransporter,
  sendEmail,
};
