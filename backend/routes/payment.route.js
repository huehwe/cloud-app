import express from 'express';
import paymentController from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, paymentController.createPayment);
router.get('/:orderId', protect, paymentController.getPaymentByOrder);

export default router;
