import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

// Components
//import Article from '../pages/Article/index';


const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(2, 0, 1, 0),
    padding: theme.spacing(1)
  },
  media: {
    minWidth: 200,
    height: 200
  },
  actionArea: {
    maxWidth: 200,
    maxHeight: 200
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    padding: 0
  },
  cardHeader: {
    padding: 5
  },
  cardText: {
    padding: 5,
    flexGrow: 1
  },
  cardActions: {
    padding: 0
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    padding: 0,
    maxWidth: 40,
    maxHeight: 40
  },
}));

const ArticleItem = props => {
  const { scream } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [liked, setLiked] = useState(scream.liked ? scream.liked : false);
  const [likes, setLikes] = useState(scream.likeCount);

  const handleLike = () => {
    setLiked(true);
    setLikes(likes => likes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes(likes => likes - 1);
  };

  dayjs.extend(relativeTime);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <Link 
        to={`/article/${scream.screamId}`}
      >
        <CardActionArea 
          className={classes.actionArea}
        >
          <CardMedia
            className={classes.media}
            image={scream.contentImage}
            title="Paella dish"
          />
        </CardActionArea>
      </Link>
      <div className={classes.content}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Link to={`/profile/${scream.userHandle}/myfeed`}>
              <Avatar aria-label="recipe" className={classes.avatar} src={scream.userImage} />
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={scream.userHandle}
          subheader={dayjs(scream.createdAt).fromNow()}
        />
        <CardContent className={classes.cardText}>
          <Typography variant="h5" style={{fontWeight: 'bold', marginBottom: 4}}>
            {scream.userHandle}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {scream.body}
          </Typography>
        </CardContent>
        <CardActions
         className={classes.cardActions}
         disableSpacing
        >
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
          <Typography
            color="textSecondary"
            variant="h6"
            style={{ marginRight: 10 }}
          >
            {likes}
          </Typography>
          <Tooltip title="Comment">
            <IconButton aria-label="add to favorites">
              <CommentIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
              pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
              medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
              again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </div>
      
    </Card>
  );
}

export default ArticleItem;
