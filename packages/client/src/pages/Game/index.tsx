import { useEffect, useRef } from 'react'
import { runAnimation } from '../../actions/game-start'
import { GameMap } from '../../actions/types'
import { drawGameMap } from '../../actions/draw-game-map'
import { initialMap } from '../../constants/initialValues'
import { moveMap } from '../../actions/move-map'

type GameProps = {
  callbackEndGame: () => void
  id: string
}

let currentGameMap: GameMap = initialMap

export const Game = ({ id, callbackEndGame }: GameProps) => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null)

  const render = (
    animationTime: number,
    step: number,
    context: CanvasRenderingContext2D
  ) => {
    const [newMap, isMistake] = moveMap({
      gameMap: currentGameMap,
      gameStep: step,
    })

    currentGameMap = newMap

    if (isMistake) callbackEndGame()

    drawGameMap({ context, gameMap: newMap, isMistake, points: step })

    return !isMistake
  }

  useEffect(() => {
    const { current } = refCanvas

    if (!current) return

    const gameContext = current.getContext('2d')

    if (!gameContext) return

    runAnimation((animationTime: number, step: number) =>
      render(animationTime, step, gameContext)
    )
  }, [refCanvas])

  return (
    <canvas
      id={id}
      ref={refCanvas}
      width={initialMap[0].length * 200}
      height={initialMap.length * 200}
    />
  )
}
