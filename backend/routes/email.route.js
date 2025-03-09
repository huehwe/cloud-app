import express from 'express';
import {
    sendVerificationCode,
    verifyCode,
    resendVerificationCode
} from '../controllers/email.controller.js';

const router = express.Router();

router.post('/send-verification', sendVerificationCode);
router.post('/verify', verifyCode);
router.post('/resend', resendVerificationCode);

export default router;