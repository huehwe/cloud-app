import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: "Category name cannot be empty" // Thêm thông báo lỗi tùy chỉnh
      },
    },
  },
  // Sequelize sẽ tự động quản lý createdAt và updatedAt
}, {
  timestamps: true,
  tableName: 'categories',
});

export default Category;
