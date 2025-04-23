import express from 'express';
import { createReview } from '../controllers/Review.controller.js';

const router = express.Router();

router.post('/', createReview);

export default router;