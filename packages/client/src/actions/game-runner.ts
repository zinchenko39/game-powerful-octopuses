import { GameInfoType } from './types'

type RunGameProps = {
  render: (animationTime: number, newInfo: GameInfoType) => boolean
  callbackEndGame?: () => void
  info: GameInfoType
}

export const runGame = ({ render, callbackEndGame, info }: RunGameProps) => {
  let lastTime = 0
  let renderStep = 0
  let isFreezeRender = false

  const renderContent = (time: number) => {
    if (!isFreezeRender && lastTime != null) {
      info.step += 1

      const timeStep = Math.min(time - lastTime, 100) / 1000

      const isGameOver = render(timeStep, info)

      if (isGameOver) {
        if (callbackEndGame) callbackEndGame()
        return
      }
    }

    renderStep += 1

    isFreezeRender = !!(renderStep % 160)

    lastTime = time

    requestAnimationFrame(renderContent)
  }

  requestAnimationFrame(renderContent)
}
