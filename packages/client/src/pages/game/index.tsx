import { useEffect, useRef } from 'react'
import { initialMap } from '../../constants/initial-values'
import { GameInfoType, GameMapType } from '../../actions/types'
import { runGame } from '../../actions/game-runner'
import { gameRender } from '../../actions/render-game'
import { runControlCar } from '../../actions/run-control-car'
import { cloneMap } from '../../utils/clone-map'

type GameProps = {
  callbackEndGame: (points: number) => void
  boardId: string
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
        map: cloneMap(initialMap),
        step: 0,
      }

      return
    }

    const render = (
      animationTime: number,
      renderStep: number
    ): [isGameOver: boolean] => {
      if (!refMapInfo.current) return [true]

      refMapInfo.current = {
        ...refMapInfo.current,
        step: refMapInfo.current.step + 1,
      }

      gameRender({
        animationTime,
        contextLink: gameContext,
        infoLink: refMapInfo.current,
        isMistake: false,
      })

      return [false]
    }

    runControlCar(refMapInfo.current.map)
    runGame(render)
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
