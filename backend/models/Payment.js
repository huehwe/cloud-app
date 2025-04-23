import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'id',
    },
  },
  method: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['credit_card', 'paypal', 'cod']],
    },
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['pending', 'paid', 'failed']],
    },
  },
  paid_at: {
    type: DataTypes.DATE,
  },
});

export default Payment;