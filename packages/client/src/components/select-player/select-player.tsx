import { Button } from '@mui/material'
import styles from './select-player.module.css'
import React from 'react'

type SelectPlayerProps = {
  handleClick: (value: number) => void
}

export const SelectPlayer: React.FC<SelectPlayerProps> = ({
  handleClick,
}: SelectPlayerProps) => {
  return (
    <div className={styles.selectPlayer}>
      <Button
        variant="contained"
        className={styles.button}
        onClick={() => handleClick(1)}>
        Один игрок
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={styles.button}
        onClick={() => handleClick(2)}>
        Два игрока
      </Button>
    </div>
  )
}
