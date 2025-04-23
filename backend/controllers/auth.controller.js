import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } }); // Sequelize method to find by condition

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hàm resendOTP
export const resendOTP = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Tìm user theo email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Tạo OTP mới
      const otp = user.generateOTP();
      await user.save();
  
      // Gửi OTP qua email
      await sendOTP(email, otp);
  
      res.status(200).json({ success: true, message: 'OTP resent successfully' });
    } catch (error) {
      console.error('Resend OTP error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Tìm user theo email và OTP
    const user = await User.findOne({
      where: { email, otp, otpExpiry: { [Op.gt]: Date.now() } }, // Sequelize condition
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Đánh dấu email đã được xác thực
    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
