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

export const Game = ({ id, callbackEndGame }: GameProps) => {
  let currentGameMap: GameMap = initialMap

  const gameContext = useRef<HTMLCanvasElement | null>(null)

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
    const { current } = gameContext

    if (!current) return

    const contextGame = current.getContext('2d')

    if (!contextGame) return

    runAnimation((animationTime: number, step: number) =>
      render(animationTime, step, contextGame)
    )
  }, [gameContext])

  return (
    <canvas
      id={id}
      ref={gameContext}
      width={initialMap[0].length * 200}
      height={initialMap.length * 200}
    />
  )
}
