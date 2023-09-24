import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import { Typography } from '@mui/material'
import TurnRightIcon from '@mui/icons-material/TurnRight'
import TurnLeftIcon from '@mui/icons-material/TurnLeft'
import {
  changeScrollBarWidth,
  changeScrollBarThumb,
} from '../../style/variables'
import { Navigation } from '../../components/navigation'
export const AboutGame: React.FC = () => {
  const changeScrollBar = {
    ...changeScrollBarWidth,
    ...changeScrollBarThumb,
  }
  return (
    <main>
      <Typography variant="h1" component="h3" align="center">
        Powerful Octopuses
      </Typography>
      <Container
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Navigation />
        <Paper
          elevation={0}
          sx={{
            width: '50%',
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
      </Container>
    </main>
  )
}
