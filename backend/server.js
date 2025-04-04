import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import orderRoutes from './routes/order.route.js';
import { connectDB } from "./config/database.js";  // Import hàm kết nối DB
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import emailRoutes from './routes/email.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL  // Địa chỉ frontend trong môi trường production
    : 'http://localhost:3000',  // Địa chỉ localhost trong môi trường phát triển
  credentials: true
}));

// Middleware để xử lý dữ liệu JSON
app.use(express.json());

// Error handling middleware (Xử lý lỗi chung)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Routes
app.use("/api/products", productRoutes);  // Route cho sản phẩm
app.use("/api/auth", authRoutes);          // Route cho xác thực
app.use("/api/orders", orderRoutes);      // Route cho đơn hàng
app.use("/api/email", emailRoutes);       // Route cho email

// Serve static files in production (Phục vụ các file tĩnh nếu trong môi trường production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Khởi động server và kết nối cơ sở dữ liệu
const startServer = async () => {
  try {
    await connectDB();  // Kết nối đến DB
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);  // Dừng server nếu kết nối DB thất bại
  }
};

startServer();  // Gọi hàm khởi động server
