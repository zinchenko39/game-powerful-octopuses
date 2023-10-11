import { EntityTypes, GameMapType } from '../types'
import car from '../../images/car.png'
import barrier from '../../images/barrier.png'

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

const imgCar = new Image()
imgCar.width = 200
imgCar.height = 200
imgCar.src = car

const imgBarrier = new Image()
imgBarrier.width = 200
imgBarrier.height = 200
imgBarrier.src = barrier

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
      let currentImage = null

      if (cell) {
        const { type } = cell

        if (type === EntityTypes.barrier) {
          color = 'Green'
          currentImage = imgBarrier
        } else {
          color = 'Yellow'
          currentImage = imgCar
        }

        color = type === EntityTypes.barrier ? 'Green' : 'Yellow'
      } else if (isMistake) {
        color = 'Red'
      }

      contextLink.fillStyle = color
      contextLink.fillRect(coordinateX * 200, coordinateY * 200, 200, 200)
      if (currentImage) {
        contextLink.drawImage(
          currentImage,
          coordinateX * 200,
          coordinateY * 200,
          200,
          200
        )
      }
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
