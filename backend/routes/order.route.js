order.route.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import { createOrder, getOrder, updateOrder, deleteOrder } from "../controllers/order.controller.js";
const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;