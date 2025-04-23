import express from 'express';
import { createPayment } from '../controllers/Payment.controller.js';

const router = express.Router();

router.post('/', createPayment);

export default router;