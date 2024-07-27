import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path as necessary

const Retreats = sequelize.define('Retreats', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.INTEGER,  // Assuming date is a UNIX timestamp
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tag: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Retreats',
  timestamps: false, 
});

export default Retreats;
