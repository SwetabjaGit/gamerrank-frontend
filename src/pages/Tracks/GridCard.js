import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  colors
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import getInitials from '../../utils/getInitials';
import Label from '../../components/Label';


const spacing = 2;

const useStyles = makeStyles(theme => ({
  root: {
  },
  header: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1)
  },
  actionArea: {
    maxWidth: '100%',
    maxHeight: 250
  },
  media: {
    minWidth: '100%',
    height: 250
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  description: {
    padding: theme.spacing(1, spacing, 0, spacing),
  },
  tags: {
    padding: theme.spacing(0, 1, 1, 1),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  details: {
    padding: theme.spacing(spacing, spacing, spacing, spacing)
  },
  learnMoreButton: {
    marginLeft: theme.spacing(spacing)
  },
  likedButton: {
    color: colors.red[600]
  },
  shareButton: {
    marginLeft: theme.spacing(1)
  },
  boldText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  centerText: {
    textAlign: 'center'
  }
}));

const GridCard = props => {
  const { track, className, ...rest } = props;

  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const tagList = track.tag_list.match(/([\w\s]+ [\w\s]+ . [\w\s]+)|([\w\s]+ [\w\s]+ [\w\s]+)|([\w\s]+ [\w\s]+)|([\w\s]+)/g);


  const handleLike = () => {
    setLiked(true);
  };

  const handleUnlike = () => {
    setLiked(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        className={classes.header}
        disableTypography
        avatar={
          <Avatar
            alt="Author"
            src={track.user.avatar_url}
          >
            {getInitials(track.user.username)}
          </Avatar>
        }
        title={
          <Link
            className={classes.boldText}
            color="textPrimary"
            href="#"
            variant="h5"
          >
            {track.genre}
          </Link>
        }
        subheader={
          <Typography variant="body2">
            by{' '}
            <Link
              className={classes.boldText}
              color="textPrimary"
              href="#"
              variant="h6"
            >
              {track.user.username.substring(0, 15)}
            </Link>{' '}
            | Updated: {moment(track.last_modified).fromNow()}
          </Typography>
        }
      />
      <CardContent className={classes.content}>

        <RouterLink to="#">
          <CardActionArea
            className={classes.actionArea}
          >
            <CardMedia
              className={classes.media}
              image={track.artwork_url}
              title={track.genre}
            />
          </CardActionArea>
        </RouterLink>

        <div className={classes.description}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            { track.title.substring(0, 40) }
          </Typography>
        </div>

        <div className={classes.tags}>
          {tagList && tagList.length > 0 ? (
            tagList
            .filter(tag => tag !== " ")
            .slice(0, 4)
            .map(tag => 
              tag !== " " ? (
                <Label
                  color={colors.red[600]}
                  key={tag}
                >
                  {tag.substring(0, 8)}
                </Label>
              ) : null
            )
          ) : (
            <Label
              color={colors.red[600]}
              key="ReactJS"
            >
              ReactJS
            </Label>
          )}
        </div>

        <Divider />

        <div className={classes.details}>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={1}
          >
            <Grid md={2} item>
              <Typography className={classes.boldText} variant="h5">
                {moment.utc(moment.duration(track.duration).asMilliseconds()).format("m:ss")}
              </Typography>
              <Typography className={classes.centerText} variant="body2">Duration</Typography>
            </Grid>
            <Grid md={7} item>
              <Typography className={classes.boldText} variant="h5">{track.genre}</Typography>
              <Typography className={classes.centerText} variant="body2">Genre</Typography>
            </Grid>
            <Grid md={3} item>
              <Typography className={classes.boldText} variant="h5">{track.state}</Typography>
              <Typography className={classes.centerText} variant="body2">State</Typography>
            </Grid>
            <Grid item>
              {liked ? (
                <Tooltip title="Unlike">
                  <IconButton
                    className={classes.likedButton}
                    onClick={handleUnlike}
                    size="small"
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Like">
                  <IconButton
                    className={classes.likeButton}
                    onClick={handleLike}
                    size="small"
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
              )}
              {/* <Typography variant="body2">{track.favoritings_count}</Typography> */}
              <Tooltip title="Share">
                <IconButton
                  className={classes.shareButton}
                  size="small"
                >
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Button
                className={classes.learnMoreButton}
                size="small"
              >
                MORE
              </Button>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

GridCard.propTypes = {
  className: PropTypes.string,
  track: PropTypes.object.isRequired
};

export default GridCard;
