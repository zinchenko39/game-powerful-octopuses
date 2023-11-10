import {
  BarrierType,
  BonusType,
  CarType,
  EntityTypes,
  GameMapType,
} from '../actions/types'

export const singUpInitialValues = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
}

export const singInInitialValues = {
  login: '',
  password: '',
}

export const newTopicInitialValues = {
  topicId: 0,
  title: '',
  description: '',
}

export const newCommentInitialValues = {
  commentId: 0,
  newComment: '',
  author: '',
}

export const CAR_1_ENTITY: CarType = { type: EntityTypes.car, playerIds: [1] }
export const CAR_2_ENTITY: CarType = { type: EntityTypes.car, playerIds: [2] }
export const CAR_1_AND_2_ENTITY: CarType = {
  type: EntityTypes.car,
  playerIds: [1, 2],
}

export const BARRIER_ENTITY: BarrierType = { type: EntityTypes.barrier }

export const BONUS_ENTITY: BonusType = { type: EntityTypes.bonus }

export const initialMap: GameMapType = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
  [null, null, null],
  [null, null, null],
  [null, null, null],
]
export const changePasswordInitialValues = {
  oldPassword: '',
  newPassword: '',
}
