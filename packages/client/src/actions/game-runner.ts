type RunGameProps = (
  animationTime: number,
  points: number
) => [isGameOver: boolean]

export const runGame = (render: RunGameProps) => {
  let lastTime = 0
  let renderStep = 0

  const renderContent = (time: number) => {
    if (lastTime != null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000

      const [isGameOver] = render(timeStep, renderStep)

      if (isGameOver) return
    }

    renderStep += 1

    lastTime = time

    requestAnimationFrame(renderContent)
  }

  requestAnimationFrame(renderContent)
}
