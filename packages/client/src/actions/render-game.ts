import { drawGameMap } from './draw-game-map'
import { moveMap } from './move-map'
import { GameInfoType } from './types'

type GameRenderProps = {
  animationTime: number
  contextLink: CanvasRenderingContext2D
  infoLink: GameInfoType
  isMistake: boolean
}

export const gameRender = ({
  animationTime,
  contextLink,
  infoLink,
  isMistake,
}: GameRenderProps) => {
  let map = infoLink.map
  if (!(infoLink.step % 160)) {
    map = moveMap({
      mapLink: infoLink.map,
      gameStep: infoLink.step,
    })

    console.log(map, ' map')
  }

  drawGameMap({
    contextLink,
    map: map,
    isMistake,
    points: infoLink.step,
    animationTime,
  })
}
