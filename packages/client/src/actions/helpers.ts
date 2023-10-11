import { BARRIER_ENTITY, BONUS_ENTITY } from '../constants/initialValues'
import { EntityTypes, GameMapType, GameRowType } from './types'

const defaultRow: GameRowType = [null, null, null]

const variation: GameRowType[] = [
  [BARRIER_ENTITY, null, null],
  [null, BARRIER_ENTITY, null],
  [null, null, BARRIER_ENTITY],
  [BARRIER_ENTITY, BARRIER_ENTITY, null],
  [null, BARRIER_ENTITY, BARRIER_ENTITY],
  [BARRIER_ENTITY, null, BARRIER_ENTITY],
  [BONUS_ENTITY, null, BARRIER_ENTITY],
  [null, BARRIER_ENTITY, BONUS_ENTITY],
]

export const getRandomRow = (gameStep: number): GameRowType => {
  const index = Math.floor(Math.random() * (variation.length + 1))

  if (variation[index] && !(gameStep % 200)) return variation[index]

  return defaultRow
}

export const getCoordinateCar = (mapLink: GameMapType) => {
  let coordinates = { x: 0, y: 0 }

  mapLink.forEach((row, coordinateY) => {
    row.forEach((cell, coordinateX) => {
      if (cell?.type === EntityTypes.car) {
        coordinates = { x: coordinateX, y: coordinateY }
      }
    })
  })

  return coordinates
}
