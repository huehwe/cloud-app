import express from 'express';
import { createCategory } from '../controllers/Category.controller.js';

const router = express.Router();

router.post('/', createCategory); // API để tạo Category mới
// Bạn có thể thêm các API khác như GET, UPDATE, DELETE Category tại đây

export default router;