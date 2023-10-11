import { CAR_ENTITY } from '../constants'
import { getCoordinateCar } from './helpers'
import { GameMapType } from './types'

const DirectionsMove = {
  вверх: { x: 0, y: -1 },
  вниз: { x: 0, y: 1 },
  влево: { x: -1, y: 0 },
  вправо: { x: 1, y: 0 },
}

type MoveCarProps = {
  mapLink: GameMapType
  move: keyof typeof DirectionsMove
}

export const moveCar = ({ mapLink, move }: MoveCarProps) => {
  const { x, y } = DirectionsMove[move]

  const { x: currentX, y: currentY } = getCoordinateCar(mapLink)

  const newCoordinateX =
    x + currentX >= 0 && x + currentX < mapLink[0].length
      ? x + currentX
      : currentX

  const newCoordinateY =
    y + currentY > 0 && y + currentY < mapLink.length ? y + currentY : currentY

  const currentCell = mapLink[newCoordinateY][newCoordinateX]

  if (currentCell) {
    console.log('наехали на препятствие')
    // dispatch mistake
  }

  mapLink[currentY][currentX] = null
  mapLink[newCoordinateY][newCoordinateX] = CAR_ENTITY
}
