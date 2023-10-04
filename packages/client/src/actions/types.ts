export enum EntityTypes {
  car = 'car',
  barrier = 'barrier',
}

export type Car = {
  type: EntityTypes.car
}

export type Barrier = {
  type: EntityTypes.barrier
}

export type GameCell = Barrier | null

export type GameCellForCar = Car | GameCell

export type GameRowForCar = [GameCellForCar, GameCellForCar, GameCellForCar]

export type GameRow = [GameCell, GameCell, GameCell]

export type GameMap = [
  GameRow,
  GameRowForCar,
  GameRowForCar,
  GameRowForCar,
  GameRowForCar,
  GameRowForCar
]

export type Coordinate = {
  x: number
  y: number
}

export type GameInfoType = {
  step: number
  map: GameMap
}
