import { getRandomRow } from './helpers'
import { moveCar } from './move-car'
import { Coordinate, EntityTypes, GameMap, GameRowForCar } from './types'

type MoveMapProps = {
  gameMap: GameMap
  gameStep: number
}

export const moveMap = ({
  gameMap,
  gameStep,
}: MoveMapProps): [GameMap, boolean] => {
  let newMap: GameRowForCar[] = []

  let mistake = false

  const lastIndexRow = gameMap.length - 1

  let newCoordinatesCar: Coordinate | null = null

  gameMap.forEach((row, coordinateY) => {
    if (coordinateY === 0) {
      newMap.push(getRandomRow(gameStep))
    }

    if (coordinateY === lastIndexRow) {
      const coordinateXCar = (row as GameRowForCar).findIndex(
        cell => cell?.type === EntityTypes.car
      )

      if (coordinateXCar === -1) return

      newCoordinatesCar = {
        y: lastIndexRow,
        x: coordinateXCar,
      }

      return
    }

    newMap.push([...row])
  })

  if (newCoordinatesCar) {
    const [mapAfterMoveCar, mistakeAfterMoveCar] = moveCar({
      gameMap: newMap as GameMap,
      coordinatesCar: newCoordinatesCar,
    })

    newMap = mapAfterMoveCar

    mistake = mistakeAfterMoveCar
  }

  const currentMistake = mistake

  return [newMap as GameMap, currentMistake]
}
