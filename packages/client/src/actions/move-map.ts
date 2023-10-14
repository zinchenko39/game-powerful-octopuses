import { getRandomRow } from './helpers'
import { moveCar } from './move-car'
import { GameInfoType } from './types'
import { cloneMap } from '../utils/clone-map'

let currentFreezeSteps = 0;

export const moveMap = (gameInfo: GameInfoType, playerIds: (1 | 2)[]) => {
  const mapLink = gameInfo.map
  const freezeSteps = gameInfo.freezeSteps

  currentFreezeSteps += 1

  if (currentFreezeSteps >= freezeSteps) {
    currentFreezeSteps = 0;

    gameInfo.step += 1

    if (!mapLink) return mapLink

    playerIds.forEach(id => {
      moveCar({ gameInfo, move: 'вверх', carId: id })
    })

    const oldMap = cloneMap(mapLink)

    mapLink.forEach((_, coordinateY) => {
      if (coordinateY === 0) {
        const newRow = getRandomRow(gameInfo.step)

        mapLink[coordinateY] = newRow

        return
      }

      mapLink[coordinateY] = oldMap[coordinateY - 1]
    })
  }
}
