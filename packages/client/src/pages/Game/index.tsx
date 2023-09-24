import { useEffect, useState } from 'react'
import { runAnimation } from '../../actions/game-start'
import { GameMap } from '../../actions/types'
import { drawGameMap } from '../../actions/draw-game-map'
import { initialMap } from '../../constants/initialValues'
import { moveMap } from '../../actions/move-map'
import { Button, Table, TableRow } from '@mui/material'

export const Game = () => {
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

    drawGameMap({ context, gameMap: newMap, isMistake })

    return !isMistake
  }

  useEffect(() => {
    const canvas = document.getElementById('board') as HTMLCanvasElement

    if (!canvas) return

    const context = canvas.getContext('2d')

    setGameContext(context)
  }, [])

  const handleClick = () => {
    if (!gameContext) return

    runAnimation((animationTime: number, step: number) =>
      render(animationTime, step, gameContext)
    )
  }

  return (
    <Table>
      <TableRow>
        <Button onClick={handleClick}>Начать</Button>
      </TableRow>
      <TableRow>
        <canvas
          id="board"
          width={initialMap[0].length * 200}
          height={initialMap.length * 200}></canvas>
      </TableRow>
    </Table>
  )
}
