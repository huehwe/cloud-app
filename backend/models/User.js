import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Import kết nối Sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Identity
  },
  name: {
    type: DataTypes.NVARCHAR(100),
    allowNull: false, // Không được để trống
  },
  email: {
    type: DataTypes.NVARCHAR(100),
    allowNull: false,
    unique: true, // Đảm bảo email là duy nhất
  },
  password_hash: {
    type: DataTypes.NVARCHAR(DataTypes.MAX), // Lưu mật khẩu đã mã hóa
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'customer', // Giá trị mặc định
    validate: {
      isIn: [['customer', 'admin', 'seller']], // Chỉ cho phép các giá trị này
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Ngày tạo mặc định là ngày hiện tại
  },
}, {
  tableName: 'Users', // Tên bảng trong cơ sở dữ liệu
  timestamps: false, // Không sử dụng các cột createdAt và updatedAt mặc định
});

export default User;