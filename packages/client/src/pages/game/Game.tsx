import React, { useState } from 'react'
import { Countdown } from '../../components/Countdown/Countdown'
import { GameEnd } from '../../components/gameEnd/GameEnd'

export function Game() {
  const [showCountdown, setShowCountdown] = useState(false)
  const [isGameOver, setIsGameOver] = useState(true)

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
        <div>
          Здесь начинается игра
          <button onClick={handleEndGame}>Завершить игру</button>
        </div>
      )}
    </div>
  )
}
