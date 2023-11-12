import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

export const Theme = sequelize.define('Theme', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'light',
  },
})
