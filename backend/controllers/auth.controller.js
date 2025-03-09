import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { sendVerificationEmail } from '../services/email.service.js';


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', email);
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        if (!user.password) {
            console.error('No password found for user');
            return res.status(500).json({
                success: false,
                message: 'Server error'
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });


        const userResponse = user.toObject();
        delete userResponse.password;

        res.json({
            success: true,
            token,
            user: userResponse
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password
        });


        const otp = user.generateOTP();
        await user.save();
        await sendVerificationEmail(email, otp);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isEmailVerified: user.isEmailVerified
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log('Verifying email:', email, 'OTP:', otp);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        console.log('User OTP data:', {
            storedOTP: user.otp.code,
            expiry: user.otp.expiry,
            currentTime: new Date()
        });

        if (!user.verifyOTP(otp)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        user.otp = undefined;
        user.isEmailVerified = true;
        await user.save();

        res.json({
            success: true,
            message: 'Email verified successfully'
        });
    } catch (error) {
        console.error('Verify email error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Attempting to resend OTP for email:', email);

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        console.log('Found user:', user ? 'Yes' : 'No');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = user.generateOTP();
        console.log('Generated new OTP:', otp);

        await user.save();
        await sendVerificationEmail(email, otp);

        res.json({
            success: true,
            message: 'New OTP sent successfully'
        });
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const handleResend = async () => {
    try {
        console.log('Resending OTP to:', email);

        const response = await fetch('/api/auth/resend-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            toast({
                title: 'Thành công',
                description: 'Mã OTP mới đã được gửi đến email của bạn',
                status: 'success',
                duration: 3000,
                isClosable: true
            });
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Resend error:', error);
        toast({
            title: 'Lỗi',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true
        });
    }
};