import { useSelector } from 'react-redux'
import { EntityTypes } from '../types'
import { gameSelector } from '../../store/selectors'
import { RootState } from '../../store'

type RunDrawGameMapProps = {
  context: CanvasRenderingContext2D
  isMistake: boolean
  boardId: string
  animationTime: number
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
  isMistake,
  boardId,
  animationTime,
}: RunDrawGameMapProps) => {
  const { map: gameMap, step: gameStep } = useSelector((state: RootState) =>
    gameSelector(state, boardId)
  )

  if (!gameMap) return

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
    context.fillText('Вы проиграли. Вы набрали - ' + gameStep + 'очков', 10, 48)
  } else {
    context.font = '30px Arial'
    context.fillStyle = 'White'
    context.fillText('Гонки. Очков - ' + gameStep, 235, 48)
  }
}
