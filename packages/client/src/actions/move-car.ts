import { CAR_1_AND_2_ENTITY, CAR_1_ENTITY, CAR_2_ENTITY } from '../constants'
import { getCoordinateCar } from './helpers'
import { EntityTypes, GameInfoType } from './types'

const DirectionsMove = {
  вверх: { x: 0, y: -1 },
  вниз: { x: 0, y: 1 },
  влево: { x: -1, y: 0 },
  вправо: { x: 1, y: 0 },
}

type MoveCarProps = {
  gameInfo: GameInfoType
  move: keyof typeof DirectionsMove
  carId?: 1 | 2
}

export const moveCar = ({ gameInfo, move, carId = 1 }: MoveCarProps) => {
  const mapLink = gameInfo.map

  const { x, y } = DirectionsMove[move]

  const [car1, car2, isTogether] = getCoordinateCar(mapLink)

  const { x: currentX, y: currentY } = carId === 1 ? car1 : car2

  let carEntity = carId === 1 ? CAR_1_ENTITY : CAR_2_ENTITY

  const newCoordinateX =
    x + currentX >= 0 && x + currentX < mapLink[0].length
      ? x + currentX
      : currentX

  const newCoordinateY =
    y + currentY > 0 && y + currentY < mapLink.length ? y + currentY : currentY

  if (newCoordinateX === currentX && newCoordinateY === currentY) return

  const currentCell = mapLink[newCoordinateY][newCoordinateX]

  if (currentCell?.type === EntityTypes.barrier) {
    gameInfo.isMistake = true
  }

  if (currentCell?.type === EntityTypes.bonus) {
    gameInfo.freezeSteps =
      gameInfo.freezeSteps < 20
        ? gameInfo.freezeSteps
        : gameInfo.freezeSteps - 10
    gameInfo.step += 100
  }

  if (currentCell?.type === EntityTypes.bonus) {
    gameInfo.freezeSteps =
      gameInfo.freezeSteps < 20
        ? gameInfo.freezeSteps
        : gameInfo.freezeSteps - 10
    gameInfo.step += 100
  }

  if (currentCell?.type === EntityTypes.car) {
    carEntity = CAR_1_AND_2_ENTITY
  }

  let other = null

  if (isTogether) {
    other = carId === 1 ? CAR_2_ENTITY : CAR_1_ENTITY
  }

  mapLink[currentY][currentX] = other
  mapLink[newCoordinateY][newCoordinateX] = carEntity
}
