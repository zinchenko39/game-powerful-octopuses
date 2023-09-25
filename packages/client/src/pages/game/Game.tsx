import React, { useState } from 'react'
import { Countdown } from '../../components/Countdown/Countdown'

export function Game() {
  const [showCountdown, setShowCountdown] = useState(true)

  const handleEndCountdown = () => {
    setShowCountdown(false)
  }

  return (
    <div>
      {showCountdown ? (
        <Countdown onEnd={handleEndCountdown} />
      ) : (
        <div>Здесь начинается игра</div>
      )}
    </div>
  )
}
