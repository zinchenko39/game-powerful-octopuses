import { EntityTypes, GameMap } from '../types'

type RunDrawGameMapProps = {
  context: CanvasRenderingContext2D
  gameMap: GameMap
  isMistake: boolean
  points: number
}

// наша карта = [
//     [null, null, { type: EntityTypes.barrier}],
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
//     [null, { type: EntityTypes.car}, null],
//     [null, null, null],
// ]

export const drawGameMap = ({
  context,
  gameMap,
  isMistake,
  points,
}: RunDrawGameMapProps) => {
  gameMap.forEach((row, coordinateY) => {
    row.forEach((cell, coordinateX) => {
      let color = 'Gray'

      if (cell) {
        const { type } = cell

        color = type === EntityTypes.barrier ? 'Green' : 'Yellow'
      } else if (isMistake) {
        color = 'Red'
      }

      context.fillStyle = color
      context.fillRect(coordinateX * 200, coordinateY * 200, 200, 200)
    })
  })

  if (isMistake) {
    context.font = '30px Arial'
    context.fillStyle = 'White'
    context.fillText('Вы проиграли. Вы набрали - ' + points + 'очков', 10, 48)
  } else {
    context.font = '30px Arial'
    context.fillStyle = 'White'
    context.fillText('Гонки. Очков - ' + points, 235, 48)
  }
}
