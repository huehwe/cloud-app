import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
// import { connectDB } from "./config/database.js"; // Sẽ dùng db.sequelize.authenticate()
import db from './models/index.js'; // Import đối tượng db từ models/index.js

// Import routes
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import orderRoutes from "./routes/order.route.js";
import emailRoutes from "./routes/email.route.js";
import categoryRoutes from "./routes/category.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderItemRoutes from "./routes/orderItem.route.js";
import paymentRoutes from "./routes/payment.route.js";

dotenv.config({ path: "./backend/.env" });

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/payments", paymentRoutes);

// Serve frontend static files (for production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const startServer = async () => {
  try {
    await db.sequelize.authenticate(); // Xác thực kết nối qua instance từ models/index.js
    console.log('Database connection authenticated.');

    // Đồng bộ hóa model với cơ sở dữ liệu
    await db.sequelize.sync({ alter: true }); // Sử dụng instance sequelize từ db
    console.log('Database synced successfully.');

    // Chỉ bắt đầu lắng nghe sau khi kết nối và đồng bộ DB thành công
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server, connect to DB, or sync database:", error);
    process.exit(1);
  }
};

startServer();
