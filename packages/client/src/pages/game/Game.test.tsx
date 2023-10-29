import { Game } from './index'
import { render, screen } from '@testing-library/react'

describe('Game page tests', () => {
  test('renders canvas', () => {
    render(<Game />)
  })
})
