import { useEffect, useState } from 'react'
import styles from './count-down.module.css'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'

export type CountDownProps = {
  onEnd: () => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Countdown = ({ onEnd, handleChange }: CountDownProps) => {
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
      <FormControl>
        <FormLabel id="choicePlayer">Выберите режим</FormLabel>
        <RadioGroup
          aria-labelledby="choicePlayer"
          name="choicePlayer"
          defaultValue="1"
          onChange={event => handleChange(event)}>
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Режим одного игрока"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Режим двух игроков"
          />
        </RadioGroup>
      </FormControl>
    </div>
  )
}
