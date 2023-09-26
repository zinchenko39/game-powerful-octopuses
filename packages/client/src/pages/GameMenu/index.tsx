import React, { useState } from 'react'
import { Countdown } from '../../components/Countdown/Countdown'
import { GameEnd } from '../../components/gameEnd/GameEnd'
import { Game } from '../game'

export function GameMenu() {
  const [showCountdown, setShowCountdown] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)

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
    console.log('Go to main')
  }

  return (
    <div>
      {showCountdown ? (
        <Countdown onEnd={handleEndCountdown} />
      ) : isGameOver ? (
        <GameEnd
          onRestart={handleRestartGame}
          onGoToMainMenu={handleGoToMainMenu}
        />
      ) : (
        <Game key="test" />
      )}
    </div>
  )
}
