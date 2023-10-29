import {
  BARRIER_ENTITY,
  BONUS_ENTITY,
  CAR_1_ENTITY,
  CAR_2_ENTITY,
} from '../constants'
import { Coordinate, EntityTypes, GameMapType, GameRowType } from './types'

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

  if (variation[index] && !(gameStep % 2)) return variation[index]

  return defaultRow
}

export const getCoordinateCar = (
  mapLink: GameMapType
): [
  firstCoordinates: Coordinate,
  secondCoordinates: Coordinate,
  isTogether: boolean
] => {
  let firstCoordinates = { x: 0, y: 0 }
  let secondCoordinates = { x: 0, y: 0 }
  let isTogether = false

  mapLink.forEach((row, coordinateY) => {
    row.forEach((cell, coordinateX) => {
      if (cell?.type === EntityTypes.car) {
        const isCar1 = cell.playerIds.includes(1)
        const isCar2 = cell.playerIds.includes(2)

        if (isCar1) {
          firstCoordinates = { x: coordinateX, y: coordinateY }
        }

        if (isCar2) {
          secondCoordinates = { x: coordinateX, y: coordinateY }
        }

        isTogether = isCar1 && isCar2
      }
    })
  })

  return [firstCoordinates, secondCoordinates, isTogether]
}

export const addPlayers = (mapLink: GameMapType, playerIds: [1] | [1, 2]) => {
  const rows = mapLink.length

  playerIds.forEach((id, index) => {
    mapLink[rows - 1][index] = id === 1 ? CAR_1_ENTITY : CAR_2_ENTITY
  })

  return mapLink
}
