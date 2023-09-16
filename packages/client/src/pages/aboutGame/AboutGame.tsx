import { Link } from 'react-router-dom'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import { Typography } from '@mui/material'
import TurnRightIcon from '@mui/icons-material/TurnRight'
import TurnLeftIcon from '@mui/icons-material/TurnLeft'
export const AboutGame: React.FC = () => {
  const changeScrollBar = {
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#d3d3d3',
      borderRadius: 5,
    },
  }
  return (
    <main>
      <Typography variant="h1" component="h3" align="center">
        Powerful Octopuses
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '50%',
            height: '50vh',
            margin: 0,
          }}>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="ИГРАТЬ" />
          </ListItemButton>
          <ListItemButton component={Link} to="/leaderboard">
            <ListItemText primary="рекорды" />
          </ListItemButton>
          <ListItemButton component={Link} to="/forum">
            <ListItemText primary="форум" />
          </ListItemButton>
          <ListItemButton component={Link} to="/profile">
            <ListItemText primary="профиль" />
          </ListItemButton>
        </List>
        <Paper
          elevation={0}
          sx={{
            width: '40%',
            height: '50vh',
            overflowY: 'scroll',
            ...changeScrollBar,
          }}>
          <Typography variant="body1">
            Добро пожаловать в увлекательный мир скорости и адреналина! Ваша
            задача - управлять мощной гоночной машиной и объезжать другие
            автомобили и препятствия на пути к победе. Держитесь крепко за руль
            и готовьтесь к невероятным приключениям! Управление вашей машиной
            осуществляется с помощью стрелок на клавиатуре:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <TurnLeftIcon />
              </ListItemIcon>
              <ListItemText>
                Стрелка влево: поворот влево. Приближайтесь к обочине, чтобы
                обогнать машины слева.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TurnRightIcon />
              </ListItemIcon>
              <ListItemText>
                Стрелка вправо: поворот вправо. Маневрируйте справа, чтобы
                объехать машины слева.
              </ListItemText>
            </ListItem>
          </List>
          <Typography variant="body1">
            Вы будете проходить через разнообразные трассы, где вас ждут не
            только другие гонщики, но и различные препятствия. Будьте
            внимательны и быстры, чтобы избегать столкновений и достичь финиша
            первыми. За победы вы будете получать очки и улучшения для вашей
            машины. Покажите всем, что вы настоящий гонщик и сможете преодолеть
            любые трудности на пути к победе! Готовы ли вы к этому вызову?
            Садитесь за руль и докажите, что вы лучший гонщик в этом мире
            скорости! Удачи на трассе!
          </Typography>
        </Paper>
      </Box>
    </main>
  )
}
