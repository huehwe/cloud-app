import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load biến môi trường từ file .env
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  port: process.env.DB_PORT || 1433,
  dialectOptions: {
    options: {
      encrypt: process.env.DB_ENCRYPT === "true",
      enableArithAbort: true,
    },
  },
  logging: false,
});

// Tạo hàm kết nối để có thể gọi trong server.js
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to Azure SQL Database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export default sequelize;