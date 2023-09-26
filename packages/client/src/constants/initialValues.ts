import { Barrier, Car, EntityTypes, GameMap } from '../actions/types'

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

export const CAR_ENTITY: Car = { type: EntityTypes.car }

export const BARRIER_ENTITY: Barrier = { type: EntityTypes.barrier }

export const initialMap: GameMap = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
  [null, null, null],
  [null, CAR_ENTITY, null],
  [null, null, null],
]
export const changePasswordInitialValues = {
  oldPassword: '',
  newPassword: '',
}
