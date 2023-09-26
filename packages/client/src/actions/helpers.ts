import { BARRIER_ENTITY } from '../constants/initialValues'
import { GameRow } from './types'

const defaultRow: GameRow = [null, null, null]

const variation: GameRow[] = [
  [BARRIER_ENTITY, null, null],
  [null, BARRIER_ENTITY, null],
  [null, null, BARRIER_ENTITY],
  [BARRIER_ENTITY, BARRIER_ENTITY, null],
  [null, BARRIER_ENTITY, BARRIER_ENTITY],
  [BARRIER_ENTITY, null, BARRIER_ENTITY],
]

export const getRandomRow = (gameStep: number): GameRow => {
  const index = Math.floor(Math.random() * (variation.length + 1))

  if (!variation[index] || (gameStep && gameStep % 2)) return defaultRow

  return variation[index]
}
