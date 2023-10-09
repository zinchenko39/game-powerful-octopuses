type RunGameProps = {
  render: (animationTime: number) => [isGameOver: boolean, points: number]
  callbackEndGame?: (points: number) => void
}

export const runGame = ({ render, callbackEndGame }: RunGameProps) => {
  let lastTime = 0
  let renderStep = 0
  let isFreezeRender = false

  const renderContent = (time: number) => {
    if (!isFreezeRender && lastTime != null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000

      const [isGameOver, points] = render(timeStep)

      if (isGameOver) {
        if (callbackEndGame) callbackEndGame(points)
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
