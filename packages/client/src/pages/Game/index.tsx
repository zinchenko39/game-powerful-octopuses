import { useEffect, useRef } from 'react'
import { runGame } from '../../actions/game-runner'
import { initialMap } from '../../constants/initialValues'
import { gameRender } from '../../actions/render-game'
import { GameMap } from '../../actions/types'

type GameProps = {
  id: string
  callbackEndGame?: () => void
}

function cloneMap() {
  return [...initialMap.map(row => [...row])]
}

export const Game = ({ callbackEndGame }: GameProps) => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null)
  const mapInfo = useRef(null);

  useEffect(() => {
    const { current } = refCanvas

    if (!current) return

    const gameContext = current.getContext('2d')

    if (!gameContext) return

    if (mapInfo.current === null) {
      mapInfo.current = {
        step: 0,
        map: cloneMap()
      }
    }

    runGame({
      info: mapInfo.current,
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
      ref={refCanvas}
      width={initialMap[0].length * 200}
      height={initialMap.length * 200}
    />
  )
}
