import { useEffect, useRef, useState } from 'react'
import { runAnimation } from '../../actions/game-start'
import { drawGameMap } from '../../actions/draw-game-map'
import { initialMap } from '../../constants/initialValues'
import { moveMap } from '../../actions/move-map'
// import { useDispatch, useSelector } from 'react-redux'
// import { updateGameBoard } from '../../store/game-boards'
// import { gameSelector } from '../../store/selectors'
// import { RootState } from '../../store'

type GameProps = {
  callbackEndGame: () => void
  boardId: string
}

export const Game = ({ boardId, callbackEndGame }: GameProps) => {
  // const dispatch = useDispatch();
  // const { map: gameMap, step: gameStep } = useSelector((state: RootState) => gameSelector(state, boardId))

  // const ref = useRef(null)

  // const render = (
  //   animationTime: number,
  //   context: CanvasRenderingContext2D
  // ) => {
  //   if (!gameMap) return false;

  //   console.log('00000000')

  //   const [boardInfo, isMistake] = moveMap({ boardId, gameMap, gameStep })

  //   console.log('00000111111')

  //   drawGameMap({ context, boardId, isMistake, animationTime })

  //   console.log(11111)

  //   dispatch(updateGameBoard({ boardId, ...boardInfo }))

  //   console.log(22222)

  //   if (isMistake) callbackEndGame()

  //   return !isMistake
  // }

  // useEffect(() => {
  //   console.log(ref, 'gameContext')

  //   if (!ref) return

  //   const { current } = ref;

  //   if (!current) return

  //   console.log(current, ' current')

  //   runAnimation((animationTime: number) => render(animationTime, current as CanvasRenderingContext2D))
  // }, [ref, boardId])

  return (
    <canvas
      ref={ref}
      id={boardId}
      width={initialMap[0].length * 200}
      height={initialMap.length * 200}
    />
  )
}
