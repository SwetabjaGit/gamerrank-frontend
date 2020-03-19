import React, { useEffect } from 'react';
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
  findFollower,
  findFollowed,
  handleFollow,
  handleUnfollow,
  handleFollowBack,
  handleRevokeFollowBack,
  clearFollower,
  hideFollowAlert,
  hideUnfollowAlert,
  hideFollowbackAlert,
  hideRevokefollowAlert
} from '../../redux/actions/userActions';



const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    flexGrow: 1,
    marginTop: 13,
    backgroundColor: '#388E3C',
  },
  inner: {
    margin: '0 auto',
    width: theme.breakpoints.values.lg
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
    user, followId, followedId, followedBack,
    findFollower, findFollowed, handleFollow,
    handleUnfollow, handleFollowBack,
    handleRevokeFollowBack, clearFollower,
    showFollowAlert, showUnfollowAlert, showFollowbackAlert, showRevokefollowAlert,
    hideFollowAlert, hideUnfollowAlert, hideFollowbackAlert, hideRevokefollowAlert,
    openFollowAlert, openUnfollowAlert, openFollowbackAlert, openRevokefollowAlert
  } = props;
  const classes = useStyles();


  useEffect(() => {
    window.onpopstate = () => {
      hideFollowAlert();
      hideUnfollowAlert();
      hideFollowbackAlert();
      hideRevokefollowAlert();
    };
  }, [hideFollowAlert, hideUnfollowAlert, hideFollowbackAlert, hideRevokefollowAlert]);
  
  useEffect(() => {
    clearFollower();
  }, [clearFollower]);

  useEffect(() => {
    findFollower(user.handle);
    findFollowed(user.handle);
  }, [findFollower, findFollowed, user.handle]);

  useEffect(() => {
    if(showFollowAlert === true){
      openFollowAlert();
    }
  }, [showFollowAlert, openFollowAlert]);

  useEffect(() => {
    if(showUnfollowAlert === true){
      openUnfollowAlert();
    }
  }, [showUnfollowAlert, openUnfollowAlert]);

  useEffect(() => {
    if(showFollowbackAlert === true){
      openFollowbackAlert();
    }
  }, [showFollowbackAlert, openFollowbackAlert]);

  useEffect(() => {
    if(showRevokefollowAlert === true){
      openRevokefollowAlert();
    }
  }, [showRevokefollowAlert, openRevokefollowAlert]);

  /* useEffect(() => {
    console.log('followId', followId);
  }, [followId]);

  useEffect(() => {
    console.log('followedId', followedId);
  }, [followedId]);

  useEffect(() => {
    console.log('followedBack', followedBack);
  }, [followedBack]); */
  

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };


  const buttonFollow = (
    <Button
      variant="contained"
      color="primary"
      className={classes.buttonSolid}
      onClick={() => handleFollow(user.handle)}
    >
      Follow
    </Button>
  );

  const buttonUnfollow = (
    <Button
      variant="outlined"
      color="primary" 
      className={classes.buttonOutlined}
      onClick={() => handleUnfollow(followId, user.handle)}
    >
      Unfollow
    </Button>
  );

  const buttonFollowBack = (
    <Button
      variant="contained"
      color="primary" 
      className={classes.buttonSolid}
      onClick={() => handleFollowBack(followedId, user.handle)}
    >
      Follow Back
    </Button>
  );

  const buttonRevokeFollowBack = (
    <Button
      variant="outlined"
      color="primary" 
      className={classes.buttonOutlined}
      onClick={() => handleRevokeFollowBack(followedId, user.handle)}
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
                  followId === null ? (
                    followedId !== null ? (
                      followedBack === true ? buttonRevokeFollowBack : buttonFollowBack
                    ) : buttonFollow
                  ) : buttonUnfollow
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
  followId: PropTypes.string,
  followedId: PropTypes.string,
  followedBack: PropTypes.bool.isRequired,
  clearFollower: PropTypes.func.isRequired,
  hideFollowAlert: PropTypes.func.isRequired,
  hideUnfollowAlert: PropTypes.func.isRequired,
  hideFollowbackAlert: PropTypes.func.isRequired,
  hideRevokefollowAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  followId: state.user.followId,
  followedId: state.user.followedId,
  followedBack: state.user.followedBack,
  showFollowAlert: state.user.showFollowAlert,
  showUnfollowAlert: state.user.showUnfollowAlert,
  showFollowbackAlert: state.user.showFollowbackAlert,
  showRevokefollowAlert: state.user.showRevokefollowAlert
});

const mapActionsToProps = {
  findFollower,
  findFollowed,
  handleFollow,
  handleUnfollow,
  handleFollowBack,
  handleRevokeFollowBack,
  clearFollower,
  hideFollowAlert,
  hideUnfollowAlert,
  hideFollowbackAlert,
  hideRevokefollowAlert
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Header);
