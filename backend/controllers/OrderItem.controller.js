import OrderItem from '../models/OrderItem.js';

export const createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;
    const orderItem = await OrderItem.create({ order_id, product_id, quantity, price });
    res.status(201).json({ success: true, data: orderItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};