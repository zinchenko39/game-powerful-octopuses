import {
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Box,
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { TopicCommentSectionProps } from '../../constants/forumInterface'
export const TopicCommentSection: React.FC<TopicCommentSectionProps> = ({
  comments,
}) => {
  return (
    <Box>
      {comments.length === 0 ? (
        <Box sx={{ textAlign: 'center' }}>
          Комментариев нет, напишите первый!
        </Box>
      ) : (
        <List>
          {comments.map(comment => (
            <ListItem key={comment.id}>
              <ListItemAvatar>
                <Avatar>
                  <AccountBoxIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="textSecondary">
                    {comment.user.username}
                  </Typography>
                }
                secondary={
                  <Typography
                    component="div"
                    variant="subtitle1"
                    color="initial">
                    {comment.user.text}
                  </Typography>
                }
              />
              <Divider />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}
