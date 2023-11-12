import { PaletteMode, createTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { ThemeService } from '../services'
import { useUser } from '../hooks'

export const theme = {
  typography: {
    fontFamily: '"Comic-Sans-MS-Pixel", sans-serif',
  },
}

const THEME_KEY = 'theme'

export const useColorTheme = () => {
  const user = useUser()

  const [mode, setMode] = useState<PaletteMode>('light')

  useEffect(() => {
    const fetchTheme = async () => {
      const themeFromBackend = await ThemeService.getTheme()
      if (typeof window !== 'undefined') {
        const isValidTheme =
          typeof themeFromBackend === 'string' &&
          ['light', 'dark'].includes(themeFromBackend)
        if (isValidTheme) {
          setMode(themeFromBackend)
        } else {
          setMode(localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light')
        }
      }
    }
    fetchTheme()
  }, [])

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    window.localStorage.setItem(THEME_KEY, newMode)
    setMode(newMode)
    if (user) {
      ThemeService.saveTheme(user.id, newMode)
    }
  }

  const modifiedTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          mode: mode,
        },
      }),
    [mode]
  )

  return {
    theme: modifiedTheme,
    toggleColorMode,
    mode,
  }
}
