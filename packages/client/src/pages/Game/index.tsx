import { useEffect, useState } from 'react'
import { runAnimation } from '../../actions/game-start'
import { GameMap } from '../../actions/types'
import { drawGameMap } from '../../actions/draw-game-map'
import { initialMap } from '../../constants/initialValues'
import { moveMap } from '../../actions/move-map'

type GameProps = {
  callbackEndGame: () => void
  callbackUserScore: (score: number) => void
  id: string
}

export const Game = ({ id, callbackEndGame, callbackUserScore }: GameProps) => {
  const [gameContext, setGameContext] =
    useState<CanvasRenderingContext2D | null>(null)
  let currentGameMap: GameMap = initialMap

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

    if (isMistake) {
      callbackEndGame()
      callbackUserScore(step)
    }

    drawGameMap({ context, gameMap: newMap, isMistake, points: step })

    return !isMistake
  }

  useEffect(() => {
    const canvas = document.getElementById('board') as HTMLCanvasElement

    if (!canvas) return

    const context = canvas.getContext('2d')

    if (!context) return

    setGameContext(context)
  }, [])

  useEffect(() => {
    if (!gameContext) return

    runAnimation((animationTime: number, step: number) =>
      render(animationTime, step, gameContext)
    )
  }, [gameContext])

  return (
    <canvas
      id={id}
      width={initialMap[0].length * 200}
      height={initialMap.length * 200}
    />
  )
}
