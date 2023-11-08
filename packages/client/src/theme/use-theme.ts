import { PaletteMode, createTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

export const theme = {
  typography: {
    fontFamily: '"Comic-Sans-MS-Pixel", sans-serif',
  },
}

export const useColorTheme = () => {
  const [mode, setMode] = useState<PaletteMode>('dark')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMode(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light')
    }
  }, [])

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('theme', newMode)
    setMode(newMode)
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
