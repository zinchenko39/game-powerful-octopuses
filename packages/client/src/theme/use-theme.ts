import { PaletteMode, createTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { ThemeService } from '../services'
import { useUser } from '../hooks'

export const theme = {
  typography: {
    fontFamily: '"Comic-Sans-MS-Pixel", sans-serif',
  },
}

export const useColorTheme = async () => {
  const user = useUser()

  const [mode, setMode] = useState<PaletteMode>('light')

  useEffect(() => {
    const fetchTheme = async () => {
      if (user) {
        const themeFromBackend = await ThemeService.getTheme(user.id)
        setMode(themeFromBackend)
      }
      if (typeof window !== 'undefined') {
        setMode(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light')
      }
    }
    fetchTheme()
  }, [user])

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('theme', newMode)
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
