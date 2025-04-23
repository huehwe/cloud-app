import express from 'express';
import { createOrderItem } from '../controllers/OrderItem.controller.js';

const router = express.Router();

router.post('/', createOrderItem);

export default router;