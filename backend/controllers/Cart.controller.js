import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const cartItem = await Cart.create({ user_id, product_id, quantity });
    res.status(201).json({ success: true, data: cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};