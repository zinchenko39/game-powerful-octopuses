export const runAnimation = (
  render: (animationTime: number, gameStep: number) => boolean
) => {
  let lastTime = 0
  let gameStep = 0
  let freezeCount = 0

  function renderContent(time: number) {
    if (lastTime != null && (!freezeCount || !(freezeCount % 160))) {
      gameStep += 1

      const timeStep = Math.min(time - lastTime, 100) / 1000

      if (render(timeStep, gameStep) === false) return
    }

    freezeCount += 1

    lastTime = time

    requestAnimationFrame(renderContent)
  }

  requestAnimationFrame(renderContent)
}
