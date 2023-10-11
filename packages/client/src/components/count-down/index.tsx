import { useEffect, useState } from 'react'
import styles from './count-down.module.css'

export type CountDownProps = {
  onEnd: () => void
}

export const Countdown = ({ onEnd }: CountDownProps) => {
  const [count, setCount] = useState(3)
  const [animation, setAnimation] = useState('fadeIn')

  useEffect(() => {
    if (count <= 0) {
      onEnd()

      return
    }

    setAnimation(styles.fadeIn)

    const timerId = setTimeout(() => {
      setAnimation(styles.fadeOut)
      setTimeout(() => setCount(count - 1), 500)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [count, onEnd])

  return (
    <div className={styles.countdownContainer}>
      <div className={`${styles.countCircle} ${animation}`}>{count}</div>
    </div>
  )
}
