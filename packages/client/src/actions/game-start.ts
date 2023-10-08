export const runAnimation = (render: (animationTime: number) => boolean) => {
  let lastTime = 0
  let freezeCount = 0

  console.log(freezeCount, ' freezeCount')

  function renderContent(time: number) {
    if (lastTime != null && (!freezeCount || !(freezeCount % 160))) {
      const timeStep = Math.min(time - lastTime, 100) / 1000

      if (render(timeStep) === false) return
    }

    freezeCount += 1

    lastTime = time

    requestAnimationFrame(renderContent)
  }

  requestAnimationFrame(renderContent)
}
