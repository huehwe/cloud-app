// backend/routes/category.route.js

import express from 'express';
import categoryController from '../controllers/category.controller.js';

const router = express.Router();

// GET all categories
router.get('/', categoryController.getAllCategories);

// POST create new category
router.post('/', categoryController.createCategory);

// PUT update category by ID
router.put('/:id', categoryController.updateCategory);

// DELETE category by ID
router.delete('/:id', categoryController.deleteCategory);

export default router;
