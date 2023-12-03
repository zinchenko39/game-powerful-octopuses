import { EntityTypes, GameInfoType } from '../types'
import car from '../../images/car.png'
import car1and2 from '../../images/car1and2.png'
import car2 from '../../images/car2.png'
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

let images: null | { [key: string]: HTMLImageElement } = null

const getImage = (src: string, size?: number) => {
  const img = new Image()
  img.width = size || 200
  img.height = size || 200
  img.src = src

  return img
}

const init = () => {
  images = {
    imgCar: getImage(car),
    imgCar2: getImage(car2),
    imgCar1and2: getImage(car1and2),
    imgBarrier: getImage(barrier, 100),
    imgBonus: getImage(bonus, 100),
  }
}

export const drawGameMap = ({
  contextLink,
  animationTime,
  infoLink,
}: RunDrawGameMapProps) => {
  const { map, step: points, isMistake } = infoLink
  if (!map) return

  if (!images) init()

  map.forEach((row, coordinateY) => {
    row.forEach((cell, coordinateX) => {
      let color = '#cdcf2d'
      let currentImage = null

      if (cell) {
        const { type } = cell

        if (type === EntityTypes.barrier) {
          currentImage = images?.imgBarrier
        } else if (type === EntityTypes.car) {
          const { playerIds } = cell

          let currentImg = playerIds[0] === 1 ? images?.imgCar : images?.imgCar2

          if (playerIds.length === 2) currentImg = images?.imgCar1and2

          currentImage = currentImg
        } else if (type === EntityTypes.bonus) {
          currentImage = images?.imgBonus
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
