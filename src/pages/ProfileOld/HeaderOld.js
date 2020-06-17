/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'; 
import PropTypes from 'prop-types';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

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
  root: {
    width: '100%',
    boxShadow: 'none',
    flexGrow: 1,
    marginTop: 12,
    backgroundColor: '#388E3C',
  },
  inner: {
    width: '100%',
    margin: '0 auto',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    width: 200,
    height: 200,
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible'
      }
    },
    margin: 'auto auto',
    padding: theme.spacing(1),
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'absolute',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 180,
      height: 180,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 50,
  },
  bannerText1: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    padding: 2,
    
  },
  bannerText2: {
    color: '#fff',
    textAlign: 'left',
    padding: 2,
  },
  dataBox: {
    zoom: 2,
    textAlign: 'center',
    minHeight: '100%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  dataText1: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dataText2: {
    color: '#fff',
  },
  changeButton: {
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(10),
    color: theme.palette.white,
    '&:hover': {
      backgroundColor: blueGrey[900]
    }
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1)
  },
  imagePicker: {
    color: '#fff',
  },
  rowBox: {
    display: 'flex',
    flexDirection: 'row'
  },
  columnBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonSolid: {
    padding: 12,
    width: '100%',
    backgroundColor: '#ffc400',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonOutlined: {
    padding: 12,
    width: '100%',
    color: '#ffc400',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
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


  useEffect(() => {
    if(process.env.NODE_ENV === 'development') {
      follower && console.log('follower: ', follower);
      user.handle && authUser &&
        console.log('connection: ', followers[user.handle + '_' + authUser]);
    }
  }, [follower, followers, user.handle, authUser]);

  
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

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <Grid container spacing={3}>
          <Grid item xs={3} sm={3}>
            <div className={classes.profile}>
              <div className="image-wrapper">
                <input
                  type="file" 
                  id="imageInput"
                  hidden="hidden"
                  onChange={handleImageChange}
                />
                <img
                  src={user.imageUrl}
                  alt="profile"
                  className="profile-image"
                  onClick={handleEditPicture}
                />
                <Tooltip title="ChangeImage" placement="bottom" aria-label="add">
                  <IconButton className={classes.button} color="inherit" onClick={handleEditPicture}>
                    <EditIcon
                      color="primary"
                      className={classes.imagePicker}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className={classes.infoBox}>
              <Typography
                className={classes.bannerText1}
                variant="h1"
              >
                { user.handle }
              </Typography>
              <Typography
                className={classes.bannerText2}
                variant="h5"
              >
                { user.bio }
              </Typography>
              <Typography
                className={classes.bannerText2}
                variant="h5"
              >
                { user.location }
              </Typography>
              <Typography
                className={classes.bannerText2}
                variant="h5"
              >
                { user.website }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3} sm={3} className={classes.dataBox}>
            <Typography
              className={classes.dataText1}
              variant="h1"
            >
              { user.postCount }
            </Typography>
            <Typography
              className={classes.dataText2}
              variant="h5"
            >
              Posts
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3} className={classes.dataBox}>
            <Typography
              className={classes.dataText1}
              variant="h1"
            >
              { user.followerCount }
            </Typography>
            <Typography
              className={classes.dataText2}
              variant="h5"
            >
              Followers
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3} className={classes.dataBox}>
            <Typography
              className={classes.dataText1}
              variant="h1"
            >
              { user.followingCount }
            </Typography>
            <Typography
              className={classes.dataText2}
              variant="h5"
            >
              Following
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className={classes.rowBox}>
              {
                authenticated && (
                  (user.handle !== authUser) ? (!isFollower ? (
                    isFollowed ? (
                      followedBack === true ? buttonRevokeFollowBack : buttonFollowBack
                    ) : buttonFollow
                  ) : buttonUnfollow) : null
                )
              }
              <Button
                variant="outlined"
                color="default"
                className={classes.buttonOutlined}
              >
                Message
              </Button>
              <Button 
                variant="outlined"
                color="default"
                className={classes.buttonOutlined}
              >
                Email
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};


Header.propTypes = {
  className: PropTypes.string,
  followers: PropTypes.object.isRequired,
  follower: PropTypes.object,
  handleFollow: PropTypes.func,
  handleUnfollow:PropTypes.func,
  handleFollowBack: PropTypes.func,
  handleRevokeFollowBack: PropTypes.func,
  clearFollower: PropTypes.func
};

const mapStateToProps = (state) => ({
  followers: state.user.followers,
  follower: state.profile.follower,
});

const mapActionsToProps = {
  handleFollow,
  handleUnfollow,
  handleFollowBack,
  handleRevokeFollowBack,
  clearFollower,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Header);
