import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fonts: {
    fontWeight: 'bold',
  },
  inline: {
    display: 'inline',
  },
}));

const Comments = ({ comments }) => {
  const classes = useStyles();
  return (
    comments?.length > 0 && (
      <List className={classes.root}>
        {comments.map((comment) => {
          return (
            <React.Fragment key={comment.id}>
              <ListItem key={comment.id} alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt='avatar' src={comment.author_avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className={classes.fonts}>
                      {comment.author_name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component='span'
                        variant='body2'
                        className={classes.inline}
                        color='textPrimary'>
                        {comment.author_email}
                      </Typography>
                      {` - ${comment.content}`}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    )
  );
};

export default Comments;
