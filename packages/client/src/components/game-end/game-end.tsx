import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { GameEndProps } from './props'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import styles from './game-end.module.css'

export function GameEnd({ onRestart, onGoToMainMenu }: GameEndProps) {
  const points = useSelector((state: RootState) => state.resultScore.score)
  return (
    <Dialog open={true} className={styles.dialogContainer}>
      <DialogTitle>Игра завершена, вы набрали {points} очков</DialogTitle>
      <DialogContent>
        Хотите сыграть еще раз или вернуться в главное меню?
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button
          onClick={onRestart}
          variant="contained"
          color="success"
          className={styles.button}>
          Повторить
        </Button>
        <Button
          onClick={onGoToMainMenu}
          variant="contained"
          color="primary"
          className={styles.button}>
          Вернуться в главное меню
        </Button>
      </DialogActions>
    </Dialog>
  )
}
