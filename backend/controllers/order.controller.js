import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';

const createOrder = async (req, res) => {
  try {
    const { user_id, items, total_price } = req.body;
    const order = await Order.create({ user_id, status: 'pending', total_price });

    for (const item of items) {
      await OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      });
    }

    res.status(201).json({ message: 'Order created', orderId: order.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const orders = await Order.findAll({
      where: { user_id },
      include: [OrderItem],
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { createOrder, getOrdersByUser };
