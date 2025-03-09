import express from 'express';
import {
    login,
    register,
    verifyEmail,
    resendOTP
} from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/resend-otp', resendOTP);
router.post('/verify-email', verifyEmail);

export default router;