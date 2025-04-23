import express from 'express';
import { addToCart } from '../controllers/Cart.controller.js';

const router = express.Router();

router.post('/', addToCart);

export default router;