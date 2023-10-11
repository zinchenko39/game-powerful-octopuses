import { CAR_ENTITY } from '../constants'
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
}

export const moveCar = ({ gameInfo, move }: MoveCarProps) => {
  const mapLink = gameInfo.map

  const { x, y } = DirectionsMove[move]

  const { x: currentX, y: currentY } = getCoordinateCar(mapLink)

  const newCoordinateX =
    x + currentX >= 0 && x + currentX < mapLink[0].length
      ? x + currentX
      : currentX

  const newCoordinateY =
    y + currentY > 0 && y + currentY < mapLink.length ? y + currentY : currentY

  const currentCell = mapLink[newCoordinateY][newCoordinateX]

  if (currentCell?.type === EntityTypes.barrier) {
    gameInfo.isMistake = true;
    // dispatch mistake
  }

  if (currentCell?.type === EntityTypes.bonus) {
    gameInfo.freezeSteps = gameInfo.freezeSteps < 20 ? gameInfo.freezeSteps : gameInfo.freezeSteps - 10;
    gameInfo.step += 100
    // dispatch mistake
  }

  mapLink[currentY][currentX] = null
  mapLink[newCoordinateY][newCoordinateX] = CAR_ENTITY
}
