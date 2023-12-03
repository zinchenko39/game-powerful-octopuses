import { Box } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import NightlightIcon from '@mui/icons-material/Nightlight'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'

import { useThemeContext } from '../../theme/theme-switch'

export const ToggleLight: React.FC = () => {
  const { mode, toggleColorMode, loading } = useThemeContext()

  if (loading) {
    return <HourglassEmptyIcon />
  }

  return (
    <Box onClick={toggleColorMode}>
      {mode === 'dark' ? <LightModeIcon /> : <NightlightIcon />}
    </Box>
  )
}
