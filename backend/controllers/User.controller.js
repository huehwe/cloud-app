import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password_hash, role } = req.body;
    const newUser = await User.create({ name, email, password_hash, role });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};