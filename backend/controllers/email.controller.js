import { sendVerificationEmail, sendOTP } from '../services/email.service.js';
import User from '../models/User.js';

export const sendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Generate new OTP
        const otp = user.generateOTP();
        await user.save();

        // Send verification email
        await sendVerificationEmail(email, otp);

        res.status(200).json({
            success: true,
            message: 'Verification code sent successfully'
        });

    } catch (error) {
        console.error('Send verification code error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error sending verification code'
        });
    }
};

export const verifyCode = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({
            email,
            otp,
            otpExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification code'
            });
        }

        // Mark email as verified
        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email verified successfully'
        });

    } catch (error) {
        console.error('Verify code error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error verifying code'
        });
    }
};

export const resendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Generate new OTP
        const otp = user.generateOTP();
        await user.save();

        // Send new OTP
        await sendOTP(email, otp);

        res.status(200).json({
            success: true,
            message: 'New verification code sent successfully'
        });

    } catch (error) {
        console.error('Resend verification code error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error resending verification code'
        });
    }
};