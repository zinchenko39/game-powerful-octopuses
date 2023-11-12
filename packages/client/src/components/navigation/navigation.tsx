import { List, ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import { ToggleLight } from '../toggle-light'

export const Navigation = () => {
  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '50vh',
        width: '20%',
        margin: 0,
      }}>
      <ListItemButton component={Link} to="/">
        <ListItemText primary="ИГРАТЬ" />
      </ListItemButton>
      <ListItemButton component={Link} to="/leaderboard">
        <ListItemText primary="Рекорды" />
      </ListItemButton>
      <ListItemButton component={Link} to="/forum">
        <ListItemText primary="Форум" />
      </ListItemButton>
      <ListItemButton component={Link} to="/profile">
        <ListItemText primary="Профиль" />
      </ListItemButton>
      <ListItemButton component={Link} to="/about">
        <ListItemText primary="Как играть?" />
      </ListItemButton>
      <ListItemButton>
        <ToggleLight />
      </ListItemButton>
    </List>
  )
}
