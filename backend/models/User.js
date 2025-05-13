import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  password: { // Đổi từ password_hash → password để controller nhận đúng
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'customer',
    validate: {
      isIn: [['customer', 'admin']],
    },
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  otpCode: { // Đổi từ otp → otpCode cho đúng với controller
    type: DataTypes.STRING,
  },
  otpExpiry: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
  tableName: 'users', // Nếu bạn muốn tên bảng là 'users'
});

export default User;
