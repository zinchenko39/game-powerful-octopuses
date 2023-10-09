import { useSelector } from 'react-redux'
import { EntityTypes, GameMapType } from '../types'
import { gameSelector } from '../../store/selectors'
import { RootState } from '../../store'

type RunDrawGameMapProps = {
  map: GameMapType
  contextLink: CanvasRenderingContext2D
  isMistake: boolean
  animationTime: number
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
  contextLink,
  isMistake,
  animationTime,
  map,
  points,
}: RunDrawGameMapProps) => {
  if (!map) return

  map.forEach((row, coordinateY) => {
    row.forEach((cell, coordinateX) => {
      let color = 'Gray'

      if (cell) {
        const { type } = cell

        color = type === EntityTypes.barrier ? 'Green' : 'Yellow'
      } else if (isMistake) {
        color = 'Red'
      }

      contextLink.fillStyle = color
      contextLink.fillRect(coordinateX * 200, coordinateY * 200, 200, 200)
    })
  })

  if (isMistake) {
    contextLink.font = '30px Arial'
    contextLink.fillStyle = 'White'
    contextLink.fillText(
      'Вы проиграли. Вы набрали - ' + points + 'очков',
      10,
      48
    )
  } else {
    contextLink.font = '30px Arial'
    contextLink.fillStyle = 'White'
    contextLink.fillText('Гонки. Очков - ' + points, 235, 48)
  }
}
