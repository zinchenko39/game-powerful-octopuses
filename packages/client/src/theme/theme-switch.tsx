/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, PropsWithChildren, createContext, useContext } from 'react'
import { PaletteMode, Theme, createTheme } from '@mui/material'
import { useColorTheme } from './use-theme'

type ThemeContextType = {
  mode: PaletteMode
  toggleColorMode: () => void
  theme: Theme
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  theme: createTheme(),
  toggleColorMode: () => {},
})

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme()
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
