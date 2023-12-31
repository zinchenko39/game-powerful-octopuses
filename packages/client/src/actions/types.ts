export enum EntityTypes {
  car = 'car',
  barrier = 'barrier',
  bonus = 'bonus',
}

export type PlayerIdTypes = (1 | 2)[]

export type CarType = {
  type: EntityTypes.car
  playerIds: PlayerIdTypes
}

export type BarrierType = {
  type: EntityTypes.barrier
}

export type BonusType = {
  type: EntityTypes.bonus
}

export type GameCellType = BonusType | BarrierType | null

export type GameCellForCarType = CarType | GameCellType

export type GameRowForCarType = [
  GameCellForCarType,
  GameCellForCarType,
  GameCellForCarType
]

export type GameRowType = [GameCellType, GameCellType, GameCellType]

export type GameMapType = [
  GameRowType,
  GameRowForCarType,
  GameRowForCarType,
  GameRowForCarType,
  GameRowForCarType,
  GameRowForCarType
]

export type Coordinate = {
  x: number
  y: number
}

export type GameInfoType = {
  map: GameMapType
  step: number
  isMistake: boolean
  freezeSteps: number
}
