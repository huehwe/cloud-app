import { Sequelize } from 'sequelize';
import sequelizeInstance from '../config/database.js';

// Import các định nghĩa model
import UserModel from './User.js';
import ProductModel from './Product.js';
import CategoryModel from './Category.js';
import OrderModel from './Order.js';
import OrderItemModel from './OrderItem.js';
import CartModel from './Cart.js'; 
import PaymentModel from './Payment.js';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

// Khởi tạo các model
db.User = UserModel;
db.Product = ProductModel;
db.Category = CategoryModel;
db.Order = OrderModel;
db.OrderItem = OrderItemModel;
db.Cart = CartModel; 
db.Payment = PaymentModel;

// Thiết lập các mối quan hệ (Associations)

// User - Order
db.User.hasMany(db.Order, { foreignKey: 'user_id', as: 'orders' });
db.Order.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });

// Category - Product
db.Category.hasMany(db.Product, { foreignKey: 'category_id', as: 'products' });
db.Product.belongsTo(db.Category, { foreignKey: 'category_id', as: 'category' });

// Order - OrderItem
db.Order.hasMany(db.OrderItem, { foreignKey: 'order_id', as: 'items' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'order_id', as: 'order' });

// Product - OrderItem
db.Product.hasMany(db.OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
db.OrderItem.belongsTo(db.Product, { foreignKey: 'product_id', as: 'product' });

// User - CartItem
db.User.hasMany(db.Cart, { foreignKey: 'user_id', as: 'cartItems' });
db.Cart.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });

// Product - CartItem
db.Product.hasMany(db.Cart, { foreignKey: 'product_id', as: 'cartEntries' });
db.Cart.belongsTo(db.Product, { foreignKey: 'product_id', as: 'product' });

// Order - Payment
db.Order.hasOne(db.Payment, { foreignKey: 'order_id', as: 'payment' });
db.Payment.belongsTo(db.Order, { foreignKey: 'order_id', as: 'order' });

export default db;