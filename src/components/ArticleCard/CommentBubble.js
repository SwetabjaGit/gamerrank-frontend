import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  commentAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  bubble: {
    padding: theme.spacing(0.5, 1.5),
    marginLeft: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  time: {
    marginLeft: 'auto'
  },
  message: {
    margin: 0,
    padding: 0
  }
}));

const CommentBubble = props => {
  const { comment, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        className={classes.commentAvatar}
        alt="Person"
        component={RouterLink}
        src={comment.userImage}
        to="/profile/1/timeline"
      />
      <div className={classes.bubble}>
        <div className={classes.header}>
          <Link
            style={{ marginRight: 15 }}
            color="textPrimary"
            component={RouterLink}
            to="/profile/1/timeline"
            variant="h6"
          >
            {comment.userHandle}
          </Link>
          <Typography
            className={classes.time}
            variant="body2"
          >
            {moment(comment.createdAt).fromNow()}
          </Typography>
        </div>
        <Typography
          className={classes.message}
          variant="body1"
          gutterBottom
        >
          {comment.body}
        </Typography>
      </div>
    </div>
  );
};

CommentBubble.propTypes = {
  className: PropTypes.string,
  comment: PropTypes.object.isRequired
};

export default CommentBubble;
