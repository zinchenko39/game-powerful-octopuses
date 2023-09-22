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
import TopicsList from './topicsList/TopicsList'
import NewTopicModal from './modalNewTopic/newTopicModal'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'

export const TopicScreen: React.FC = () => {
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const speedDialActions = [
    { icon: <CreateOutlinedIcon />, name: 'Создать тему' },
  ]

  const handleSpeedDialOpen = () => {
    setIsSpeedDialOpen(true)
  }

  const handleSpeedDialClose = () => {
    setIsSpeedDialOpen(false)
  }
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <main>
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
        <TopicsList />
        <SpeedDial
          ariaLabel="SpeedDial"
          icon={<SpeedDialIcon />}
          onClose={handleSpeedDialClose}
          onOpen={handleSpeedDialOpen}
          open={isSpeedDialOpen}
          direction="up"
          sx={{ position: 'sticky', bottom: 16 }}>
          {speedDialActions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                handleSpeedDialClose()
                handleOpenModal()
              }}
            />
          ))}
        </SpeedDial>
      </Box>
      <NewTopicModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  )
}
