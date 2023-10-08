export enum EntityTypes {
  car = 'car',
  barrier = 'barrier',
}

export type CarType = {
  type: EntityTypes.car
}

export type BarrierType = {
  type: EntityTypes.barrier
}

export type GameCellType = BarrierType | null

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
