import { GameMapType } from '../actions/types'

export const cloneMap = (map: GameMapType) =>
  [...map.map(row => [...row])] as GameMapType
