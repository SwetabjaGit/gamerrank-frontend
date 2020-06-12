import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  CardMedia,
  Avatar,
  Link,
  Typography,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import Reactions from './Reactions';
import CommentBubble from './CommentBubble';
import CommentForm from './CommentForm';


const useStyles = makeStyles(theme => ({
  root: {},
  subheader: {
    display: 'flex',
    alignItems: 'center'
  },
  accessTimeIcon: {
    color: theme.palette.text.secondary,
    fontSize: '14px',
    height: 14,
    width: 14,
    marginRight: 6
  },
  content: {
    paddingTop: 0
  },
  message: {
    marginBottom: theme.spacing(2)
  },
  mediaArea: {
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 400,
    backgroundPosition: 'initial'
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const PostCard = props => {
  const { article, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        avatar={
          <Avatar
            alt="Person"
            className={classes.avatar}
            component={RouterLink}
            src={article.userImage}            
            to={`/profile/${article.userHandle}/myfeed`}
          />
        }
        disableTypography
        subheader={
          <div className={classes.subheader}>
            <AccessTimeIcon className={classes.accessTimeIcon} />
            <Typography variant="body2">
              {moment(article.createdAt).fromNow()}
            </Typography>
          </div>
        }
        title={
          <Link
            to={`/profile/${article.userHandle}/myfeed`}
            variant="h6"
          >
            <Typography variant="body2">
              {article.userHandle}
            </Typography>
            
          </Link>
        }
      />
      <CardContent className={classes.content}>
        <Typography
          className={classes.message}
          variant="body1"
        >
          {article.body}
        </Typography>
        {article.media && (
          <CardActionArea className={classes.mediaArea}>
            <CardMedia
              className={classes.media}
              image={article.media}
            />
          </CardActionArea>
        )}
        <Reactions
          className={classes.reactions}
          likeCount={article.likeCount}
        />
        <Divider className={classes.divider} />
        {article.comments && (
          <div className={classes.comments}>
            {article.comments.map(comment => (
              <CommentBubble
                comment={comment}
                key={comment.createdAt}
              />
            ))}
          </div>
        )}
        <Divider className={classes.divider} />
        <CommentForm />
      </CardContent>
    </Card>
  );
};

PostCard.propTypes = {
  className: PropTypes.string
};

export default PostCard;
