import express from 'express';
import {
    verifyEmail, // Maps to your intended 'verifyCode'
    resendOTP    // Maps to your intended 'sendVerificationCode' and 'resendVerificationCode'
} from '../controllers/auth.controller.js'; // Corrected controller path

const router = express.Router();

router.post('/send-verification', resendOTP); // Using resendOTP for sending/resending verification
router.post('/verify', verifyEmail);          // Using verifyEmail for verification
router.post('/resend', resendOTP);            // Using resendOTP for resending

export default router;