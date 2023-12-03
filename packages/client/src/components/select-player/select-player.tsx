import { Button } from '@mui/material'
import styles from './select-player.module.css'
import React from 'react'
import AccessibilityIcon from '@mui/icons-material/Accessibility'

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
        onClick={() => handleClick(1)}
        style={{
          width: '300px',
          height: '300px',
          margin: '20px',
          display: 'flex',
          flexFlow: 'column',
        }}>
        Один игрок
        <AccessibilityIcon fontSize="large" />
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{
          width: '300px',
          height: '300px',
          margin: '20px',
          display: 'flex',
          flexFlow: 'column',
        }}
        onClick={() => handleClick(2)}>
        Два игрока
        <div>
          <AccessibilityIcon fontSize="large" />
          <AccessibilityIcon fontSize="large" />
        </div>
      </Button>
    </div>
  )
}
