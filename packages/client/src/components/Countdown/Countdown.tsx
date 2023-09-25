import React, { useEffect, useState } from 'react'
import { CountDownProps } from './props'
import styles from './Countdown.module.css'

export function Countdown({ onEnd }: CountDownProps) {
  const [count, setCount] = useState(3)
  const [animation, setAnimation] = useState('fadeIn')

  useEffect(() => {
    if (count > 0) {
      setAnimation(styles.fadeIn)
      const timerId = setTimeout(() => {
        setAnimation(styles.fadeOut)
        setTimeout(() => setCount(count - 1), 500)
      }, 1000)
      return () => clearTimeout(timerId)
    } else {
      onEnd()
    }
  }, [count, onEnd])

  return (
    <div className={styles.countdownContainer}>
      <div className={`${styles.countCircle} ${animation}`}>{count}</div>
    </div>
  )
}
