import express from 'express';
import { protect } from '../middleware/auth.js';
import orderController from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', protect, orderController.createOrder);
router.get('/my-orders', protect, orderController.getOrdersByUser);

export default router;