import { drawGameMap } from './draw-game-map'
import { moveMap } from './move-map'
import { GameInfoType } from './types'

type GameRenderProps = {
  animationTime: number
  context: CanvasRenderingContext2D
  info: GameInfoType
}

export const gameRender = ({
  animationTime,
  context,
  info,
}: GameRenderProps) => {
  const [newMap, isMistake] = moveMap({
    gameMap: info.map,
    gameStep: info.step,
  })

  info.map = newMap

  drawGameMap({ context, gameMap: newMap, isMistake, points: info.step })

  return isMistake
}
