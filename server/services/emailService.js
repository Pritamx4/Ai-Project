// Email Service
const { sendEmail } = require('../config/email');

/**
 * Get welcome email HTML template
 */
const getWelcomeEmailTemplate = (fullName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to AI Resume Builder</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 14px;
        }
        .features {
          background: white;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
          border-left: 4px solid #667eea;
        }
        .features ul {
          list-style-type: none;
          padding: 0;
        }
        .features li {
          padding: 8px 0;
          padding-left: 25px;
          position: relative;
        }
        .features li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #667eea;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Welcome to AI Resume Builder!</h1>
      </div>
      <div class="content">
        <h2>Hi ${fullName},</h2>
        <p>Thank you for creating an account on our platform! We're excited to have you on board.</p>
        
        <p>You've just taken the first step towards building an impressive resume and portfolio that stands out.</p>
        
        <div class="features">
          <h3>What you can do now:</h3>
          <ul>
            <li>Create professional resumes with AI assistance</li>
            <li>Build your portfolio website</li>
            <li>Connect your GitHub to showcase your projects</li>
            <li>Generate multiple resume versions for different roles</li>
            <li>Download your resume in multiple formats</li>
          </ul>
        </div>
        
        <center>
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard" class="button">
            Get Started Now →
          </a>
        </center>
        
        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
        
        <p>Best regards,<br>
        <strong>The AI Resume Builder Team</strong></p>
      </div>
      <div class="footer">
        <p>This email was sent to you because you created an account on AI Resume Builder.</p>
        <p>&copy; ${new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
};

/**
 * Send welcome email to new user
 */
const sendWelcomeEmail = async (email, fullName) => {
  const mailOptions = {
    from: `"AI Resume Builder" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🎉 Welcome to AI Resume Builder - Let\'s Get Started!',
    html: getWelcomeEmailTemplate(fullName),
    text: `Hi ${fullName},\n\nThank you for creating an account on AI Resume Builder! We're excited to have you on board.\n\nYou can now create professional resumes, build your portfolio, and showcase your projects.\n\nGet started: ${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard\n\nBest regards,\nThe AI Resume Builder Team`,
  };

  return await sendEmail(mailOptions);
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (email, fullName, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: `"AI Resume Builder" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔐 Password Reset Request - AI Resume Builder',
    html: `
      <h2>Hi ${fullName},</h2>
      <p>You requested to reset your password for your AI Resume Builder account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>The AI Resume Builder Team</p>
    `,
  };

  return await sendEmail(mailOptions);
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  getWelcomeEmailTemplate,
};
