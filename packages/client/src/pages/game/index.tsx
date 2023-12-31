import { useEffect, useRef } from 'react'
import { initialMap } from '../../constants/initial-values'
import { GameInfoType } from '../../actions/types'
import { runGame } from '../../actions/game-runner'
import { runControlCar } from '../../actions/run-control-car'
import { cloneMap } from '../../utils/clone-map'
import { moveMap } from '../../actions/move-map'
import { drawGameMap } from '../../actions/draw-game-map'
import { addPlayers } from '../../actions/helpers'

type GameProps = {
  callbackEndGame: (points: number) => void
  boardId: string
  playerIds: [1, 2] | [1]
}

export const Game = ({ boardId, callbackEndGame, playerIds }: GameProps) => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null)
  const refMapInfo = useRef<null | GameInfoType>(null)

  useEffect(() => {
    const { current } = refCanvas

    if (!current) return

    const gameContext = current.getContext('2d')

    if (!gameContext) return

    if (refMapInfo.current === null) {
      refMapInfo.current = {
        map: cloneMap(addPlayers(initialMap, playerIds)),
        step: 0,
        isMistake: false,
        freezeSteps: 100,
      }

      return
    }

    const render = (animationTime: number) => {
      if (!refMapInfo.current) return true

      moveMap(refMapInfo.current, playerIds)

      drawGameMap({
        contextLink: gameContext,
        infoLink: refMapInfo.current,
        animationTime,
      })

      if (refMapInfo.current.isMistake) callbackEndGame(refMapInfo.current.step)

      return refMapInfo.current.isMistake
    }

    runControlCar({ gameInfo: refMapInfo.current, playerIds })

    runGame(render)
  }, [refCanvas])

  return (
    <canvas
      ref={refCanvas}
      id={boardId}
      key={boardId}
      width={initialMap[0].length * 200}
      height={initialMap.length * 200}
    />
  )
}
