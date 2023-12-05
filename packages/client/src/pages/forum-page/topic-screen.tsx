import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Typography,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Box,
  Breadcrumbs,
} from '@mui/material'
import { TopicsList } from '../../components'
import { NewTopicModal } from '../../components'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'

export const TopicScreen: React.FC = () => {
  const [key, setKey] = useState(0)

  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const speedDialActions = [
    { icon: <CreateOutlinedIcon />, name: 'Создать тему' },
  ]

  const toggleSpeedDial = () => {
    setIsSpeedDialOpen(!isSpeedDialOpen)
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Box component={Link} to="/about">
          Главная
        </Box>
        <Typography color="text.primary">Форум</Typography>
      </Breadcrumbs>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" align="center">
          форум
        </Typography>
        <TopicsList key={key} />
        <SpeedDial
          ariaLabel="SpeedDial"
          icon={<SpeedDialIcon />}
          onClose={toggleSpeedDial}
          onOpen={toggleSpeedDial}
          open={isSpeedDialOpen}
          direction="up"
          sx={{ position: 'sticky', bottom: 16 }}>
          {speedDialActions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                toggleSpeedDial()
                toggleModal()
              }}
            />
          ))}
        </SpeedDial>
      </Box>
      <NewTopicModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        callback={() => setKey(value => value + 1)}
      />
    </Box>
  )
}
