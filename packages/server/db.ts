import { Sequelize } from 'sequelize'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const sequelize = new Sequelize(
  POSTGRES_DB || '', //Название базы данных
  POSTGRES_USER || '', //Имя пользователя
  POSTGRES_PASSWORD || '', //Пароль
  {
    dialect: 'postgres',
    host: 'localhost',
    port: Number(POSTGRES_PORT) || 0,
  }
)
