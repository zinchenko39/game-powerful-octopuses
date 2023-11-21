import { Button } from '@mui/material'
import styles from './select-player.module.css'
import React from 'react'

type SelectPlayerProps = {
  handleClick: (value: React.MouseEvent<HTMLButtonElement>) => void
}

export const SelectPlayer: React.FC<SelectPlayerProps> = ({
  handleClick,
}: SelectPlayerProps) => {
  return (
    <div className={styles.selectPlayer}>
      <Button
        variant="contained"
        className={styles.button}
        value={1}
        onClick={event => handleClick(event)}>
        Один игрок
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={styles.button}
        value={2}
        onClick={event => handleClick(event)}>
        Два игрока
      </Button>
    </div>
  )
}
