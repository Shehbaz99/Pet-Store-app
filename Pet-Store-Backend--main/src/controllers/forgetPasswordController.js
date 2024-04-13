// app/controllers/authController.js
const bcrypt = require('bcrypt');
const userModel = require('../models/user_model');
const transporter = require('../config/mailConfig');

// forgotPassword
const authController = {
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const users = await userModel.findOne({ email });

      if (!users) {
        return res.status(404).json({ error: 'userModel not found' });
      }

      // Generate a reset token and set the expiry time to 1 hour
      const resetToken = Math.random().toString(36).slice(2);
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour

      users.resetToken = resetToken;
      users.resetTokenExpiry = resetTokenExpiry;
      await users.save();

      // Send the reset link to the users's email
      const resetLink = `http://localhost:3000/auth/reset-password/${resetToken}`;
      const mailOptions = {
        from: 'MrCoder105@gmail.com',
        to: email,
        subject: 'Password Reset Link',
        html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
      };
      await transporter.sendMail(mailOptions);

      res.json({ message: 'Reset link sent to your email' });
    } catch (error) {
      console.error('Forgot password error', error);
      res.status(500).json({ error: 'Internal server error to send the reset' });
    }
  },

  // resetPassword
  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;
      const users = await userModel.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }

      });

      if (!users) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      // Hash the new password and update the users's password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      users.password = hashedPassword;
      users.resetToken = null;
      users.resetTokenExpiry = null;
      await users.save();

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Reset password error', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


  // updatePassword
  updatePassword: async (req, res) => {
    try {
      const { userId, newPassword } = req.body;
      const users = await userModel.findById(userId);

      if (!users) {
        return res.status(404).json({ error: 'userModel not found' });
      }

      // Hash the new password and update the users's password
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the hashed password in the database
      users.password = newHashedPassword;
      await users.save();

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Update password error', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


};

module.exports = authController;
