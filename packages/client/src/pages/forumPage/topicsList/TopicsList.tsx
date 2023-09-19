import { Link } from 'react-router-dom'
import {
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Box,
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import CommentIcon from '@mui/icons-material/Comment'
import { topics } from '../dataFake'

const TopicsList: React.FC = () => {
  // тут будет получение всех тем из api, пока тут dummy
  return (
    <List sx={{ m: 3, px: 3, py: 2 }}>
      {topics.length === 0 ? (
        <Box>
          <Typography
            variant="h4"
            component="h4"
            align="center"
            color={'text.secondary'}>
            тем нет, создайте новую...
          </Typography>
        </Box>
      ) : (
        topics.map(topic => (
          <ListItemButton
            key={topic.id}
            component={Link}
            to={`/forum/${topic.id}`}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={topic.title} secondary={topic.autor} />
            <ListItemSecondaryAction>
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <Typography
                component="div"
                variant="body2"
                align="center"
                color="text.secondary"
                sx={{ width: '50%' }}>
                {topic.comment}
              </Typography>
            </ListItemSecondaryAction>
          </ListItemButton>
        ))
      )}
    </List>
  )
}
export default TopicsList
