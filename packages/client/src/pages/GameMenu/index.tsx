import { useState } from 'react'
import { Countdown } from '../../components/Countdown/Countdown'
import { GameEnd } from '../../components/gameEnd/GameEnd'
import { Container, Button } from '@mui/material'
import { Game } from '../Game'
import { useNavigate } from 'react-router-dom'
import { RouterName } from '../../router/types'

const boardId = 'boardId'

export function GameMenu() {
  const [showCountdown, setShowCountdown] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState<number>(0)
  const navigate = useNavigate()
  const [textFullScreenButton, setTextFullScreenButton] =
    useState('на полный экран')

  const handleEndCountdown = () => {
    setShowCountdown(false)
  }

  const handleEndGame = (scoreValue: number) => {
    // сохранять очки в state после завершения
    setScore(scoreValue)
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

  const handleClickFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setTextFullScreenButton('уменьшить экран')
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      setTextFullScreenButton('на полный экран')
    }
  }

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={handleClickFullScreen}>{textFullScreenButton}</Button>
      <Game boardId={boardId} callbackEndGame={handleEndGame} />
      {isGameOver ? (
        <GameEnd
          onRestart={handleRestartGame}
          onGoToMainMenu={handleGoToMainMenu}
          points={score}
        />
      ) : null}
    </Container>
  )
}
