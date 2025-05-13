import OrderItem from '../models/OrderItem.js';

// Lấy tất cả order items
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.status(200).json(orderItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy order items theo order_id
const getOrderItemsByOrderId = async (req, res) => {
  try {
    const { order_id } = req.params;
    const orderItems = await OrderItem.findAll({ where: { order_id } });
    res.status(200).json(orderItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy order item theo ID của chính nó
const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params; // ID này là khóa chính của OrderItem
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      return res.status(404).json({ message: 'Order item not found' });
    }
    res.status(200).json(orderItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo order item mới
const createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;
    const newItem = await OrderItem.create({
      order_id,
      product_id,
      quantity,
      price,
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật order item theo id
const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, price } = req.body;
    await OrderItem.update(
      { quantity, price },
      { where: { id } }
    );
    res.status(200).json({ message: 'Order item updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xoá order item theo id
const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderItem.destroy({ where: { id } });
    res.status(200).json({ message: 'Order item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getAllOrderItems,
  getOrderItemById, // Thêm hàm này vào export
  getOrderItemsByOrderId,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
