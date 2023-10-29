import { moveCar } from './move-car'
import { GameInfoType, PlayerIdTypes } from './types'

type RunControlCarType = {
  playerIds: PlayerIdTypes
  gameInfo: GameInfoType
}

const keys = {
  1: {
    влево: ['a', 'A', 'ф', 'Ф'],
    вниз: ['s', 'S', 'ы', 'Ы'],
    вверх: ['w', 'W', 'ц', 'Ц'],
    вправо: ['d', 'D', 'в', 'В'],
  },
  2: {
    влево: ['4', '4', '4', '4'],
    вниз: ['5', '5', '5', '5'],
    вверх: ['8', '8', '8', '8'],
    вправо: ['6', '6', '6', '6'],
  },
}

export const runControlCar = ({ gameInfo, playerIds }: RunControlCarType) => {
  const [player1Id, player2Id] = playerIds
  document.addEventListener('keypress', e => {
    switch (e.key) {
      case keys[player1Id]['влево'][0]:
      case keys[player1Id]['влево'][1]:
      case keys[player1Id]['влево'][2]:
      case keys[player1Id]['влево'][3]: {
        moveCar({ carId: 1, gameInfo, move: 'влево' })

        break
      }
      case keys[player1Id]['вниз'][0]:
      case keys[player1Id]['вниз'][1]:
      case keys[player1Id]['вниз'][2]:
      case keys[player1Id]['вниз'][3]: {
        moveCar({ carId: 1, gameInfo, move: 'вниз' })

        break
      }
      case keys[player1Id]['вверх'][0]:
      case keys[player1Id]['вверх'][1]:
      case keys[player1Id]['вверх'][2]:
      case keys[player1Id]['вверх'][3]: {
        moveCar({ carId: 1, gameInfo, move: 'вверх' })

        break
      }
      case keys[player1Id]['вправо'][0]:
      case keys[player1Id]['вправо'][1]:
      case keys[player1Id]['вправо'][2]:
      case keys[player1Id]['вправо'][3]: {
        moveCar({ carId: 1, gameInfo, move: 'вправо' })

        break
      }
      default: {
        console.log(e.key)
      }
    }

    if (player2Id) {
      switch (e.key) {
        case keys[player2Id]['влево'][0]:
        case keys[player2Id]['влево'][1]:
        case keys[player2Id]['влево'][2]:
        case keys[player2Id]['влево'][3]: {
          moveCar({ carId: 2, gameInfo, move: 'влево' })

          break
        }
        case keys[player2Id]['вниз'][0]:
        case keys[player2Id]['вниз'][1]:
        case keys[player2Id]['вниз'][2]:
        case keys[player2Id]['вниз'][3]: {
          moveCar({ carId: 2, gameInfo, move: 'вниз' })

          break
        }
        case keys[player2Id]['вверх'][0]:
        case keys[player2Id]['вверх'][1]:
        case keys[player2Id]['вверх'][2]:
        case keys[player2Id]['вверх'][3]: {
          moveCar({ carId: 2, gameInfo, move: 'вверх' })

          break
        }
        case keys[player2Id]['вправо'][0]:
        case keys[player2Id]['вправо'][1]:
        case keys[player2Id]['вправо'][2]:
        case keys[player2Id]['вправо'][3]: {
          moveCar({ carId: 2, gameInfo, move: 'вправо' })

          break
        }
        default: {
          console.log(e.key)
        }
      }
    }
  })
}
