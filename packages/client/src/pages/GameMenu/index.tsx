import React, { useState } from 'react'
import { Countdown } from '../../components/Countdown/Countdown'
import { Game } from '../game'

export function GameMenu() {
  const [showCountdown, setShowCountdown] = useState(true)

  const handleEndCountdown = () => {
    setShowCountdown(false)
  }

  if (showCountdown) {
    return <Countdown onEnd={handleEndCountdown} />
  }

  return <Game key="test" />
}
