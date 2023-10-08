import { useSelector } from 'react-redux'
import { getRandomRow } from './helpers'
import { moveCar } from './move-car'
import {
  Coordinate,
  EntityTypes,
  GameMapType,
  GameRowForCarType,
} from './types'
import { RootState } from '../store'
import { gameSelector } from '../store/selectors'
import { initialMap } from '../constants'

type MoveMapProps = {
  boardId: string
  gameMap: GameMapType
  gameStep: number
}

export const moveMap = ({
  boardId,
  gameMap,
  gameStep,
}: MoveMapProps): [
  boardInfo: { map: GameMapType; step: number },
  isMistake: boolean
] => {
  if (!gameMap) return [{ map: initialMap, step: 0 }, true]

  let newMap: GameRowForCarType[] = []

  let mistake = false

  const lastIndexRow = gameMap.length - 1

  let newCoordinatesCar: Coordinate | null = null

  gameMap.forEach((row, coordinateY) => {
    if (coordinateY === 0) {
      newMap.push(getRandomRow(gameStep))
    }

    if (coordinateY === lastIndexRow) {
      const coordinateXCar = (row as GameRowForCarType).findIndex(
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
      gameMap: newMap as GameMapType,
      coordinatesCar: newCoordinatesCar,
    })

    newMap = mapAfterMoveCar

    mistake = mistakeAfterMoveCar
  }

  const currentMistake = mistake

  return [{ map: newMap as GameMapType, step: gameStep + 1 }, currentMistake]
}
