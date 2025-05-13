import express from 'express';
import cartController from "../controllers/cart.controller.js";
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.get('/', protect, cartController.getCartByUser);
router.post('/', protect, cartController.addToCart);
router.put('/:id', protect, cartController.updateCartItem);
router.delete('/:id', protect, cartController.removeCartItem);

export default router;
