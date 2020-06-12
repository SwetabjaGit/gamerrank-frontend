import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Typography,
  Button,
  Hidden,
  IconButton,
  Snackbar,
  Tooltip,
  colors
} from '@material-ui/core';

// Icons
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';

// Redux Stuff
import { connect } from 'react-redux';
import { 
  handleFollow,
  handleUnfollow,
  handleFollowBack,
  handleRevokeFollowBack,
  clearFollower,
} from '../../redux/actions/user';


const useStyles = makeStyles(theme => ({
  root: {},
  cover: {
    position: 'relative',
    height: 300,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage:
        'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    },
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible'
      }
    }
  },
  changeButton: {
    visibility: 'hidden',
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: colors.blueGrey[900],
    color: theme.palette.white,
    [theme.breakpoints.down('md')]: {
      top: theme.spacing(3),
      bottom: 'auto'
    },
    '&:hover': {
      backgroundColor: colors.blueGrey[900]
    }
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1)
  },
  container: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    padding: theme.spacing(2, 3),
    margin: '0 auto',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  avatar: {
    border: `2px solid ${theme.palette.white}`,
    height: 120,
    width: 120,
    top: -60,
    left: theme.spacing(3),
    position: 'absolute'
  },
  details: {
    marginLeft: 136
  },
  actions: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    },
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  messageButton: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.white
    }
  },
  addButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white
    }
  },
  pendingButton: {
    color: theme.palette.danger,
    outlineColor: theme.palette.danger,
    '&:hover': {
      backgroundColor: colors.red[600],
      color: theme.palette.white,
    }
  },
  personAddIcon: {
    marginRight: theme.spacing(1)
  },
  mailIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = (props) => {
  const {
    user, authenticated, authUser, followers, follower,
    handleFollow, handleUnfollow, handleFollowBack, handleRevokeFollowBack,
    clearFollower,
    openFollowAlert, openUnfollowAlert, openFollowbackAlert, openRevokefollowAlert
  } = props;
  const classes = useStyles();
  const [isFollower, setisFollower] = useState('');
  const [isFollowed, setisFollowed] = useState('');
  const [followedBack, setFollowedBack] = useState(false);

  /* useEffect(() => {
    if(process.env.NODE_ENV === 'development') {
      console.log('followId', follower.followId);
      console.log('followedId', follower.followedId);
      console.log('followBack', followers[user.handle + '_' + authUser].followBack);
      console.log('isFollowed', followers[user.handle + '_' + authUser]);
    }
  }, [follower.followId, follower.followedId, followers, isFollowed, user.handle, authUser]); */
  
  useEffect(() => {
    window.onpopstate = () => {
      clearFollower();
    }
  }, [clearFollower]);

  useEffect(() => {
    if(authenticated){
      setisFollower(followers[authUser + '_' + user.handle]);
      setisFollowed(followers[user.handle + '_' + authUser]);
    }
  }, [authenticated, followers, authUser, user.handle]);

  useEffect(() => {
    if(authenticated && isFollowed){
      setFollowedBack(followers[user.handle + '_' + authUser].followBack);
    }
  }, [authenticated, user.handle, authUser, followers, isFollowed]);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const followUser = () => {
    setisFollower(authUser + '_' + user.handle);
    setisFollowed(null);
    followers[authUser + '_' + user.handle] = {
      follower: authUser,
      following: user.handle,
      followBack: false
    }
    handleFollow(user.handle);
    openFollowAlert(true);
  };

  const unfollowUser = () => {
    setisFollower(null);
    setisFollowed(null);
    delete followers[authUser + '_' + user.handle];
    handleUnfollow(follower.followId, user.handle);
    openUnfollowAlert(true);
  };

  const followBackUser = () => {
    setFollowedBack(true);
    followers[user.handle + '_' + authUser].followBack = true;
    handleFollowBack(follower.followedId, user.handle);
    openFollowbackAlert(true);
  };

  const revokeFollowBackUser = () => {
    setFollowedBack(false);
    followers[user.handle + '_' + authUser].followBack = false;
    handleRevokeFollowBack(follower.followedId, user.handle);
    openRevokefollowAlert(true);
  };


  const buttonFollow = (
    <Button
      variant="contained"
      color="primary"
      className={classes.buttonSolid}
      onClick={followUser}
    >
      Follow
    </Button>
  );

  const buttonUnfollow = (
    <Button
      variant="outlined"
      color="primary" 
      className={classes.buttonOutlined}
      onClick={unfollowUser}
    >
      Unfollow
    </Button>
  );

  const buttonFollowBack = (
    <Button
      variant="contained"
      color="primary" 
      className={classes.buttonSolid}
      onClick={followBackUser}
    >
      Follow Back
    </Button>
  );

  const buttonRevokeFollowBack = (
    <Button
      variant="outlined"
      color="primary" 
      className={classes.buttonOutlined}
      onClick={revokeFollowBackUser}
    >
      Revoke FollowBack
    </Button>
  );

  const userPlaceholder = {
    name: 'Shen Zhi',
    bio: 'Web Developer',
    avatar: '/images/avatars/avatar_11.png',
    cover: '/images/covers/cover_2.jpg',
    connectedStatus: 'not_connected'
  };

  const [connectedStatus, setConnectedStatus] = useState(user.connectedStatus); // if rejected do not show the button
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (connectedStatus === 'pending') {
      setOpenSnackbar(true);
    }
  }, [connectedStatus]);

  const handleConnectToggle = () => {
    setConnectedStatus(connectedStatus =>
      connectedStatus === 'not_connected' ? 'pending' : 'not_connected'
    );
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div
      className={classes.root}
    >
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${userPlaceholder.cover})` }}
      >
        <Button
          className={classes.changeButton}
          variant="contained"
        >
          <AddPhotoIcon className={classes.addPhotoIcon} />
          Change Cover
        </Button>
      </div>
      <div className={classes.container}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src={user.imageUrl}
        />
        <div className={classes.details}>
          {/* <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            {user.bio}
          </Typography> */}
          <Typography
            component="h1"
            variant="h4"
          >
            {user.handle}
          </Typography>
        </div>
        <Hidden smDown>
          <div className={classes.actions}>
            <Button
              className={classes.messageButton}
              color="secondary"
              component={RouterLink}
              to="/chat"
              variant="outlined"
            >
              <ChatIcon className={classes.mailIcon}/>
              Message
            </Button>
            {connectedStatus === 'not_connected' && (
              <Button
                className={classes.addButton}
                color="primary"
                onClick={handleConnectToggle}
                variant="outlined"
              >
                <PersonAddIcon className={classes.personAddIcon}/>
                Add
              </Button>
            )}
            {connectedStatus === 'pending' && (
              <Button
                className={classes.pendingButton}
                onClick={handleConnectToggle}
                variant="outlined"
              >
                <PersonAddIcon className={classes.personAddIcon}/>
                Pending
              </Button>
            )}
            <Tooltip title="More options">
              <IconButton>
                <MoreIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Hidden>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        autoHideDuration={6000}
        message={
          <Typography
            color="inherit"
            variant="h6"
          >
            Sent connection request
          </Typography>
        }
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
