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

const boardId = 'boardId'

export function GameMenu() {
  const dispatch = useDispatch()
  const [showCountdown, setShowCountdown] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)

  const navigate = useNavigate()
  const [changeFullScreen, textContent] = useFullScreen()

  const handleEndCountdown = () => {
    setShowCountdown(false)
  }

  const handleEndGame = (scoreValue: number) => {
    dispatch(updateResultScore(scoreValue))

    setIsGameOver(true)
  }

  const handleRestartGame = () => {
    setIsGameOver(false)

    setShowCountdown(true)
  }
  const handleGoToMainMenu = () => {
    navigate(RouterName.about)
  }

  if (showCountdown) {
    return <Countdown onEnd={handleEndCountdown} />
  }

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={changeFullScreen}>{textContent}</Button>
      <Game boardId={boardId} callbackEndGame={handleEndGame} />
      {isGameOver ? (
        <GameEnd
          onRestart={handleRestartGame}
          onGoToMainMenu={handleGoToMainMenu}
        />
      ) : null}
    </Container>
  )
}
