// app/routes/authRoutes.js
const express = require('express');
const forgetPasswordController = require('../controllers/forgetPasswordController');

const router = express.Router();
router.post('/forgot-password', forgetPasswordController.forgotPassword);
router.post('/reset-password', forgetPasswordController.resetPassword);
router.post('/change-password', forgetPasswordController.updatePassword);

module.exports = router;
