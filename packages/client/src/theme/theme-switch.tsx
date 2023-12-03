import { FC, PropsWithChildren, createContext, useContext } from 'react'
import { Theme, createTheme } from '@mui/material'
import { useColorTheme } from './use-theme'

type ThemeContextType = {
  mode: string
  toggleColorMode: () => void
  theme: Theme
  loading: boolean
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: '',
  theme: createTheme(),
  toggleColorMode: () => undefined,
  loading: false,
})

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme()

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
