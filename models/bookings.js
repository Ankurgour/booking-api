// models/booking.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Retreats from './retreats.js';

const Booking = sequelize.define('Booking', {
  // id: {
  //   type: DataTypes.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  // },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  retreat_title:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  retreat_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Retreats',
      key: 'id',
    },
    allowNull: false,
  },
  retreat_location:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  booking_date: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'Bookings',
});

Booking.belongsTo(Retreats, { foreignKey: 'retreat_id' });

export default Booking;
