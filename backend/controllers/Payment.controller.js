import Payment from '../models/Payment.js';

export const createPayment = async (req, res) => {
  try {
    const { order_id, method, status, paid_at } = req.body;
    const payment = await Payment.create({ order_id, method, status, paid_at });
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};