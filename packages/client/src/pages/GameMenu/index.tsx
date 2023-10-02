import { useState } from 'react'
import { Countdown } from '../../components/Countdown/Countdown'
import { GameEnd } from '../../components/gameEnd/GameEnd'
import { Container } from '@mui/material'
import { Game } from '../Game'
import { useNavigate } from 'react-router-dom'
import { RouterName } from '../../router/types'

export function GameMenu() {
  const [showCountdown, setShowCountdown] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)

  const navigate = useNavigate()

  const handleEndCountdown = () => {
    setShowCountdown(false)
  }

  const handleEndGame = () => {
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
      <Game id="board" callbackEndGame={handleEndGame} />
      {isGameOver ? (
        <GameEnd
          onRestart={handleRestartGame}
          onGoToMainMenu={handleGoToMainMenu}
        />
      ) : null}
    </Container>
  )
}
