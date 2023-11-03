import { Page500 } from './index'
import { render, screen } from '@testing-library/react'

const defaultError = 'Ошибка сервера'
const customError = 'Какая то другая ошибка'

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')

  return {
    __esModule: true,
    ...originalModule,
    useNavigate: jest.fn(),
  }
})

describe('Page500 Tests', () => {
  test('renders default error', async () => {
    render(<Page500 />)

    expect(screen.getByText(defaultError)).toBeDefined()
  })

  test('renders custom error', async () => {
    render(<Page500 description={customError} />)

    expect(screen.getByText(customError)).toBeDefined()
  })
})
