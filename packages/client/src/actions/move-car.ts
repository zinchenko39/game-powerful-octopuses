import { CAR_ENTITY } from '../constants/initialValues'
import { Coordinate, EntityTypes, GameMap } from './types'

type MoveCarProps = {
  gameMap: GameMap
  coordinatesCar: Coordinate
}

export const moveCar = ({
  gameMap,
  coordinatesCar,
}: MoveCarProps): [GameMap, boolean] => {
  console.log(' смещение машины ', coordinatesCar)
  let currentMistake = false

  const newMap: GameMap = [...gameMap]

  const { x, y } = coordinatesCar

  const currentCell = newMap[y][x]

  newMap.forEach(row => {
    row.forEach(cell => {
      if (!cell) return

      const { type } = cell

      if (type === EntityTypes.car) {
        cell = null
      }
    })
  })

  if (currentCell) currentMistake = true

  newMap[y][x] = CAR_ENTITY

  return [newMap, currentMistake]
}
