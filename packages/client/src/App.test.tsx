//import { App } from './App'
import { render, screen } from '@testing-library/react'

const appContent = 'Game'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<>{appContent}</>)

  expect(screen.getByText(appContent)).toBeDefined()
})
