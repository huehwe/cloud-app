import Payment from '../models/Payment.js';

const createPayment = async (req, res) => {
  try {
    const { order_id, method, status, paid_at } = req.body;
    const payment = await Payment.create({
      order_id,
      method,
      status,
      paid_at,
    });
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPaymentByOrder = async (req, res) => {
  try {
    const { orderId } = req.params; // Sử dụng orderId từ route params
    const payment = await Payment.findOne({ where: { order_id: orderId } }); // Query DB bằng cột order_id
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paid_at } = req.body;
    await Payment.update({ status, paid_at }, { where: { id } });
    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  createPayment,
  getPaymentByOrder,
  updatePaymentStatus,
};
