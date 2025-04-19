import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Đảm bảo đúng đường dẫn đến file database.js

// Tạo model Product
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default Product;
