import { moveCar } from './move-car'
import { GameInfoType } from './types'

type RunControlCarType = {
  controlButtons: 'first' | 'second'
  gameInfo: GameInfoType
}

const keys = {
  first: {
    'влево': ['a', 'A', 'ф', 'Ф'],
    'вниз': ['s', 'S', 'ы', 'Ы'],
    'вверх': ['w', 'W', 'ц', 'Ц'],
    'вправо': ['d', 'D', 'в', 'В'],
  },
  second: {
    'влево': ['4', '4', '4', '4'],
    'вниз': ['5', '5', '5', '5'],
    'вверх': ['8', '8', '8', '8'],
    'вправо': ['6', '6', '6', '6'],
  },
}

export const runControlCar = ({ gameInfo, controlButtons }: RunControlCarType) => {
  document.addEventListener('keypress', e => {
    switch (e.key) {
      case keys[controlButtons]['влево'][0]:
      case keys[controlButtons]['влево'][1]:
      case keys[controlButtons]['влево'][2]:
      case keys[controlButtons]['влево'][3]: {
        moveCar({ gameInfo, move: 'влево' })

        break
      }
      case keys[controlButtons]['вниз'][0]:
      case keys[controlButtons]['вниз'][1]:
      case keys[controlButtons]['вниз'][2]:
      case keys[controlButtons]['вниз'][3]: {
        moveCar({ gameInfo, move: 'вниз' })

        break
      }
      case keys[controlButtons]['вверх'][0]:
      case keys[controlButtons]['вверх'][1]:
      case keys[controlButtons]['вверх'][2]:
      case keys[controlButtons]['вверх'][3]: {
        moveCar({ gameInfo, move: 'вверх' })

        break
      }
      case keys[controlButtons]['вправо'][0]:
      case keys[controlButtons]['вправо'][1]:
      case keys[controlButtons]['вправо'][2]:
      case keys[controlButtons]['вправо'][3]: {
        moveCar({ gameInfo, move: 'вправо' })

        break
      }
      default: {
        console.log(e.key)
      }
    }
  })
}
