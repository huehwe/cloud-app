import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    const { user_id, product_id, rating, comment } = req.body;
    const review = await Review.create({ user_id, product_id, rating, comment });
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};