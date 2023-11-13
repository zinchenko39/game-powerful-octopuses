import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import TopicModel from './Topic.model'
import ReplyModel from './Reply.model'
import ReactionModel from './Reaction.model'

@Table({
  tableName: 'comments',
  paranoid: false,
})
class CommentModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  comment_id: number

  @Column(DataType.INTEGER)
  author_id: number

  @ForeignKey(() => TopicModel)
  @Column(DataType.INTEGER)
  topic_id: number

  @BelongsTo(() => TopicModel)
  topic: TopicModel

  @Length({ max: 32, min: 3 })
  @Column(DataType.STRING)
  text: string

  @HasMany(() => ReplyModel, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  reply: ReplyModel[]

  @HasMany(() => ReactionModel, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  reaction: ReactionModel[]
}

export default CommentModel
