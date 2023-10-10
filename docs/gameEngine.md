## UML диаграмма формирования типов

```mermaid
classDiagram
  direction RL

  class GameMap {
    GameRowType[]
  }

  class GameRowType {
    (GameRowForCarType | GameCellType)[]
  }

  class GameRowForCarType {
    (null | CarType | BarrierType)[]
  }

  class GameCellType {
    (null | BarrierType)
  }

  class BarrierType {
    type: "barrier"
  }

  class CarType {
    type: "car"
  }

  GameMap <|-- GameRowType
  GameRowType <|-- GameCellType
  GameRowType <|-- GameRowForCarType
  GameRowForCarType <|-- CarType
  GameRowForCarType <|-- BarrierType
  GameCellType <|-- BarrierType

```

всё просто, по шагам:
1) игрок заходит на страницу с игрой
2) запускается движок game-runner
3) game-runner рекурсивно запускает requestAnimationFrame
4) мы контролируем как часто будет rerender поля и имеем точку остановки
5) считаем шаги на каждой перерисовке карты и двигаем карту в move-map
6) точка остановки игры - когда игрок находится в ячейке с препятствием
7) машину двигаем функцией move-map