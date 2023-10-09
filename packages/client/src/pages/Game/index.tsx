import { useEffect, useRef } from 'react'
import { initialMap } from '../../constants/initialValues'
import { GameInfoType, GameMapType } from '../../actions/types'
import { runGame } from '../../actions/game-runner'
import { gameRender } from '../../actions/render-game'

type GameProps = {
  callbackEndGame: (points: number) => void
  boardId: string
}

function cloneMap() {
  return [...initialMap.map(row => [...row])] as GameMapType
}

export const Game = ({ boardId, callbackEndGame }: GameProps) => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null)
  const refMapInfo = useRef<null | GameInfoType>(null)

  useEffect(() => {
    const { current } = refCanvas

    if (!current) return

    const gameContext = current.getContext('2d')

    if (!gameContext) return

    if (refMapInfo.current === null) {
      refMapInfo.current = {
        map: cloneMap(),
        step: 0,
      }

      return
    }

    const render = (animationTime: number) => {
      if (!refMapInfo.current)
        return [true, 0] as [isGameOver: boolean, points: number]

      refMapInfo.current = {
        ...refMapInfo.current,
        step: refMapInfo.current.step + 1,
      }

      return gameRender({
        animationTime,
        contextLink: gameContext,
        infoLink: refMapInfo.current as GameInfoType,
      })
    }

    runGame({
      render,
      callbackEndGame,
    })
  }, [refCanvas])

  return (
    <canvas
      ref={refCanvas}
      id={boardId}
      width={initialMap[0].length * 200}
      height={initialMap.length * 200}
    />
  )
}
