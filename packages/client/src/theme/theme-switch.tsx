import { FC, PropsWithChildren, createContext, useContext } from 'react'
import { Theme, createTheme } from '@mui/material'
import { useColorTheme } from './use-theme'

type ThemeContextType = {
  mode: string
  toggleColorMode: () => void
  theme: Theme
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: '',
  theme: createTheme(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
})

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme()
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}