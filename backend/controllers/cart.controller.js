import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const getCartByUser = async (req, res) => {
  try {
    // user_id should come from the authenticated user (set by 'protect' middleware)
    const user_id = req.user.id; 
    if (!user_id) {
      return res.status(400).json({ message: "User ID not found in request. Ensure user is authenticated." });
    }
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [Product],
    });
    return res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const [cartItem, created] = await Cart.findOrCreate({
      where: { user_id, product_id },
      defaults: { quantity },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    await Cart.update({ quantity }, { where: { id } });
    res.status(200).json({ message: 'Cart item updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.destroy({ where: { id } });
    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getCartByUser,
  addToCart,
  updateCartItem,
  removeCartItem,
};
