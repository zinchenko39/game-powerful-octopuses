import { Box } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import NightlightIcon from '@mui/icons-material/Nightlight'
import { useThemeContext } from '../../theme/theme-switch'

export const ToggleLight: React.FC = () => {
  const { mode, toggleColorMode } = useThemeContext()
  return (
    <Box onClick={toggleColorMode}>
      {mode === 'dark' ? <LightModeIcon /> : <NightlightIcon />}
    </Box>
  )
}
