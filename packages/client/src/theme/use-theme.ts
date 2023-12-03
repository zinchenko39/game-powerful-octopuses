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

const fetchTheme = async () => {
  const themeFromBackend = await ThemeService.getTheme()

  if (themeFromBackend === 'light' || themeFromBackend === 'dark') {
    return themeFromBackend
  }

  const storageTheme = localStorage.getItem(THEME_KEY)

  localStorage.getItem(THEME_KEY)

  return storageTheme || 'light'
}

export const useColorTheme = () => {
  const user = useUser()

  const [mode, setMode] = useState<string>(
    localStorage.getItem(THEME_KEY) || 'light'
  )

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!user) return

    setLoading(true)

    ;(async () => {
      const newMode = await fetchTheme()

      if (mode !== newMode) setMode(newMode)

      setLoading(false)
    })()
  }, [user])

  const toggleColorMode = async () => {
    setLoading(true)

    const newMode = mode === 'light' ? 'dark' : 'light'

    window.localStorage.setItem(THEME_KEY, newMode)

    if (user) {
      await ThemeService.saveTheme(user.id, newMode)
    }

    setMode(newMode)
    setLoading(false)
  }

  const modifiedTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          mode: mode as PaletteMode,
        },
      }),
    [mode]
  )

  return {
    theme: modifiedTheme,
    toggleColorMode,
    mode,
    loading,
  }
}
