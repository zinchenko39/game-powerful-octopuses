import { EntityTypes, GameInfoType } from '../types'
import car from '../../images/car.png'
import barrier from '../../images/barrier.png'
import bonus from '../../images/bonus.png'

type RunDrawGameMapProps = {
  contextLink: CanvasRenderingContext2D
  animationTime: number
  infoLink: GameInfoType
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
imgBarrier.width = 100
imgBarrier.height = 100
imgBarrier.src = barrier

const imgBonus = new Image()
imgBonus.width = 100
imgBonus.height = 100
imgBonus.src = bonus

export const drawGameMap = ({
  contextLink,
  animationTime,
  infoLink
}: RunDrawGameMapProps) => {
  const { map, step: points, isMistake } = infoLink;
  if (!map) return

  map.forEach((row, coordinateY) => {
    row.forEach((cell, coordinateX) => {
      let color = '#cdcf2d'
      let currentImage = null

      if (cell) {
        const { type } = cell

        if (type === EntityTypes.barrier) {
          currentImage = imgBarrier
        } else if (type === EntityTypes.car) {
          currentImage = imgCar
        } else if (type === EntityTypes.bonus) {
          currentImage = imgBonus
        }
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
