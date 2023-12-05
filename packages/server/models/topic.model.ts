import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

export const Topic = sequelize.define('Topic', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: false,
  },
  description: {
    type: DataTypes.STRING,
    unique: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})
