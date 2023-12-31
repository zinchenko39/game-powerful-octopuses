import { useState } from 'react'
import { Countdown } from '../../components/count-down'
import { GameEnd } from '../../components/game-end/game-end'
import { Container, Button } from '@mui/material'
import { Game } from '../game'
import { useNavigate } from 'react-router-dom'
import { RouterName } from '../../router/types'
import { useDispatch } from 'react-redux'
import { updateResultScore } from '../../store/result-score'
import { useFullScreen } from '../../hooks/use-full-screen'
import { usePostScoreMutation } from '../../store/api/leader-board-api/leader-board-api'
import { useUser } from '../../hooks'
import { SelectPlayer } from '../../components/select-player/select-player'

const boardId = 'boardId'

export function GameMenu() {
  const dispatch = useDispatch()

  const [showCountdown, setShowCountdown] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)

  const user = useUser()
  const [postScore] = usePostScoreMutation()

  const navigate = useNavigate()
  const [changeFullScreen, textContent] = useFullScreen()

  const [playerIds, setPlayerIds] = useState<[1] | [1, 2] | null>(null)

  const handleEndCountdown = () => {
    setShowCountdown(false)
  }

  const handleEndGame = (scoreValue: number) => {
    dispatch(updateResultScore(scoreValue))

    postScore({
      data: {
        points: scoreValue,
        name: user?.email || 'Неизвестный игрок',
      },
    })
    if (Notification.permission === 'granted') {
      console.log(1)
      new Notification('Поздравляем!', {
        body: `Вы набрали ${scoreValue} очков, так держать!`,
      })
    }
    setIsGameOver(true)
  }

  const handleRestartGame = () => {
    setIsGameOver(false)

    setPlayerIds(null)
  }
  const handleGoToMainMenu = () => {
    navigate(RouterName.about)
  }
  const handleSelectPlayer = (value: number) => {
    setPlayerIds(value === 1 ? [1] : [1, 2])
    setShowCountdown(true)
  }

  if (playerIds === null) {
    return <SelectPlayer handleClick={handleSelectPlayer} />
  }

  if (showCountdown) {
    return <Countdown onEnd={handleEndCountdown} />
  }

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={changeFullScreen}>{textContent}</Button>
      <Game
        boardId={boardId}
        callbackEndGame={handleEndGame}
        playerIds={playerIds}
      />
      {isGameOver ? (
        <GameEnd
          onRestart={handleRestartGame}
          onGoToMainMenu={handleGoToMainMenu}
        />
      ) : null}
    </Container>
  )
}
