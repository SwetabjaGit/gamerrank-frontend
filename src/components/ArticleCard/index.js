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
//import AccessTimeIcon from '@material-ui/icons/AccessTime';

// Components
import CommentBubble from './CommentBubble';
import CommentForm from './CommentForm';
import Reactions from './Reactions';


const useStyles = makeStyles(theme => ({
  root: {
  },
  cardHeader: {
    margin: 0,
    padding: theme.spacing(1.5, 1.5, 1, 2),
    //border: '1px solid black',
  },
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
    padding: 0,
    margin: 0,
    marginBottom: -30,
  },
  message: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  mediaArea: {
    padding: 0,
    margin: 0,
    marginBottom: -5,
  },
  media: {
    height: 400,
    backgroundPosition: 'initial'
  },
  contentFooter: {
    margin: theme.spacing(2, 2.5),
    //border: '1px solid black',
  },
  reactions: {
  },
  comments: {
    margin: theme.spacing(2, 0),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: '#ccc'
  }
}));

const ArticleCard = props => {
  const { scream, className, ...rest } = props;
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar
            alt="Person"
            className={classes.avatar}
            component={RouterLink}
            src={scream.userImage}
            to={`/profile/${scream.userHandle}/myfeed`}
          />
        }
        disableTypography
        subheader={
          <div className={classes.subheader}>
            {/* <AccessTimeIcon className={classes.accessTimeIcon} /> */}
            <Typography variant="body2">
              {moment(scream.createdAt).fromNow()}
            </Typography>
          </div>
        }
        title={
          <Link
            to={`/profile/${scream.userHandle}/myfeed`}
            color="textPrimary"
            variant="h6"
            component={RouterLink}
          >
            {scream.userHandle}
          </Link>
        }
      />
      <CardContent className={classes.content}>
        <Typography
          className={classes.message}
          variant="body1"
        >
          {scream.body}
        </Typography>
        {scream.contentImage && (
          <CardActionArea className={classes.mediaArea}>
            <CardMedia
              className={classes.media}
              image={scream.contentImage}
            />
          </CardActionArea>
        )}
        <div className={classes.contentFooter}>
          <Reactions
            className={classes.reactions}
            scream={scream}
          />
          <Divider className={classes.divider} />
          {scream.comments && (
            <div className={classes.comments}>
              {scream.comments.map(comment => (
                <CommentBubble
                  comment={comment}
                  key={comment.id}
                />
              ))}
            </div>
          )}
          <Divider className={classes.divider} />
          <CommentForm/>
        </div>
      </CardContent>
    </Card>
  );
};

ArticleCard.propTypes = {
  className: PropTypes.string,
  scream: PropTypes.object.isRequired
};

export default ArticleCard;
