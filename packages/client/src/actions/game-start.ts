export const runAnimation = (
  render: (animationTime: number, gameStep: number) => boolean
) => {
  let lastTime = 0
  let gameStep = 0

  function renderContent(time: number) {
    setTimeout(() => {
      gameStep += 1

      if (lastTime != null) {
        const timeStep = Math.min(time - lastTime, 100) / 1000

        if (render(timeStep, gameStep) === false) return
      }
      lastTime = time

      requestAnimationFrame(renderContent)
    }, 1500)
  }

  requestAnimationFrame(renderContent)
}
