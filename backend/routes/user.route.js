import express from 'express';
import { createUser } from '../controllers/User.controller.js';

const router = express.Router();

router.post('/', createUser); // API để tạo User mới
// Bạn có thể thêm các API khác như GET, UPDATE, DELETE User tại đây

export default router;