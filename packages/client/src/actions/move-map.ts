import { getCoordinateCar, getRandomRow } from './helpers'
import { moveCar } from './move-car'
import { GameMapType } from './types'
import { cloneMap } from '../utils/clone-map'

type MoveMapProps = {
  mapLink: GameMapType
  gameStep: number
}

export const moveMap = ({ mapLink, gameStep }: MoveMapProps): GameMapType => {
  if (!mapLink) return mapLink

  moveCar({ mapLink, move: 'вверх' })

  const oldMap = cloneMap(mapLink)

  mapLink.forEach((_, coordinateY) => {
    if (coordinateY === 0) {
      const newRow = getRandomRow(gameStep)

      console.log(newRow, gameStep, ' newRow')

      mapLink[coordinateY] = newRow

      return
    }

    mapLink[coordinateY] = oldMap[coordinateY - 1]
  })

  return mapLink
}
