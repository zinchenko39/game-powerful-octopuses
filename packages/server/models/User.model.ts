import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Length,
} from 'sequelize-typescript'

@Table({
  tableName: 'users',
  paranoid: false,
})
class UserModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number

  @Column(DataType.INTEGER)
  user_id: number

  @Length({ max: 32, min: 3 })
  @Column(DataType.STRING)
  name: string
}

export default UserModel
