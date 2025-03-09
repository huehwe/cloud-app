import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
    try {
        const { cartItems, shippingAddress } = req.body;

        if (!req.user.isEmailVerified) {
            return res.status(403).json({
                message: 'Please verify your email before checkout'
            });
        }

        const order = await Order.create({
            user: req.user._id,
            items: cartItems,
            shippingAddress,
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        });

        res.json({
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});