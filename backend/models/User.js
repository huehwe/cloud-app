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
    // unique: true, // Sẽ định nghĩa qua 'indexes' để tương thích tốt hơn với alter:true trên MSSQL
    allowNull: false,
  },
  password: { // Đổi từ password_hash → password để controller nhận đúng
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    // defaultValue: 'customer', // Tạm thời bình luận dòng này để tránh lỗi cú pháp SQL với alter:true trên MSSQL
    validate: {
      isIn: [['customer', 'admin']],
    },
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    // defaultValue: false, // Tạm thời bình luận để tránh lỗi cú pháp SQL với alter:true trên MSSQL
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
  indexes: [
    {
      unique: true,
      fields: ['email'],
      name: 'UQ_users_email' // Đặt tên cho ràng buộc unique (tùy chọn nhưng nên có)
    }
  ]
});

export default User;
