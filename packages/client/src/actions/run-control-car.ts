import { moveCar } from './move-car'
import { GameMapType } from './types'

export const runControlCar = (mapLink: GameMapType) => {
  document.addEventListener('keypress', e => {
    switch (e.key) {
      case 'a':
      case 'ф': {
        moveCar({ mapLink, move: 'влево' })

        break
      }
      case 's':
      case 'ы': {
        moveCar({ mapLink, move: 'вниз' })

        break
      }
      case 'w':
      case 'ц': {
        moveCar({ mapLink, move: 'вверх' })

        break
      }
      case 'в':
      case 'd': {
        moveCar({ mapLink, move: 'вправо' })

        break
      }
      default: {
        console.log(e.key)
      }
    }
  })
}
