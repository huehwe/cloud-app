import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import orderRoutes from './routes/order.route.js';
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import emailRoutes from './routes/email.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(cors({
	origin: process.env.NODE_ENV === 'production'
		? ['https://cloud-backend-cda8c7gbercxa6hh.southeastasia-01.azurewebsites.net', process.env.FRONTEND_URL]
		: 'http://localhost:3000',
	credentials: true
}));

app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Something went wrong!' });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/email", emailRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start server
const startServer = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
};

startServer();
