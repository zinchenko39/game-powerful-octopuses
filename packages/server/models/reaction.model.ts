import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

export const Reaction = sequelize.define('Reaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reaction: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'like',
  },
})
