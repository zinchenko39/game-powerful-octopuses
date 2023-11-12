import { Sequelize } from 'sequelize'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

export const sequelize = new Sequelize(
  POSTGRES_DB || '', //Название базы данных
  POSTGRES_USER || '', //Имя пользователя
  POSTGRES_PASSWORD || '', //Пароль
  {
    dialect: 'postgres',
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT) || 0,
  }
)
