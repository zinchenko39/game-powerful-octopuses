type RunGameProps = (animationTime: number) => boolean

export const runGame = (render: RunGameProps) => {
  let lastTime = 0

  const renderContent = (time: number) => {
    if (lastTime != null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000

      const isGameOver = render(timeStep)

      if (isGameOver) return
    }

    lastTime = time

    requestAnimationFrame(renderContent)
  }

  requestAnimationFrame(renderContent)
}
