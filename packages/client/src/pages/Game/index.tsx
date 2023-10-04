import { useEffect, useRef } from 'react'
import { runGame } from '../../actions/game-runner'
import { initialMap } from '../../constants/initialValues'
import { gameRender } from '../../actions/render-game'
import { GameMap } from '../../actions/types'

type GameProps = {
  id: string
  callbackEndGame?: () => void
}

export const Game = ({ id, callbackEndGame }: GameProps) => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const { current } = refCanvas

    if (!current) return

    const gameContext = current.getContext('2d')

    if (!gameContext) return

    if (refCanvas && !(refCanvas as any)[id]) {
      ;(refCanvas as any)[id] = {
        map: [...initialMap.map(row => [...row])] as GameMap,
        step: 0,
      }

      return
    }
    const info = (refCanvas as any)[id]

    runGame({
      info,
      render: (animationTime: number, newInfo) =>
        gameRender({
          animationTime,
          context: gameContext,
          info: newInfo,
        }),
      callbackEndGame,
    })
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
