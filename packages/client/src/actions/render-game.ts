import { drawGameMap } from './draw-game-map'
import { moveMap } from './move-map'
import { GameInfoType } from './types'

type GameRenderProps = {
  animationTime: number
  contextLink: CanvasRenderingContext2D
  infoLink: GameInfoType
}

export const gameRender = ({
  animationTime,
  contextLink,
  infoLink,
}: GameRenderProps): [isGameOver: boolean, points: number] => {
  const [boardInfo, isMistake] = moveMap({
    gameMap: infoLink.map,
    gameStep: infoLink.step,
  })

  const { map, step } = boardInfo

  infoLink.map = map

  drawGameMap({ contextLink, map, isMistake, points: step, animationTime })

  return [isMistake, step]
}
