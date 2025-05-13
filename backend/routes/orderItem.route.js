import express from 'express';
import orderItemController from '../controllers/orderItem.controller.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), orderItemController.getAllOrderItems);
router.get('/:id', protect, authorizeRoles('admin'), orderItemController.getOrderItemById);

export default router;

