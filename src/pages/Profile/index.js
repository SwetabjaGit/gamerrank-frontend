import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Tabs,
  Tab,
  Divider,
  colors,
  Grid,
} from '@material-ui/core';
import { withRouter, Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../../utils/Alert';
import PropTypes from 'prop-types';

// Components
import Header from './Header';
import HeaderSkeleton from '../../utils/HeaderSkeleton';
import MyArticles from './MyArticles';
import FavoritedArticles from './FavoritedArticles';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchProfile, clearProfile } from '../../redux/actions/dataActions';
import { 
  hideFollowAlert,
  hideUnfollowAlert,
  hideFollowbackAlert,
  hideRevokefollowAlert
} from '../../redux/actions/userActions';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    backgroundColor: '#F4F6F8'
  },
  box: {
    marginLeft: 100,
    marginRight: 100
  },
  feed: {
    margin: 'auto',
    width: theme.breakpoints.values.lg
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  },
}));


const Profile = (props) => {

  const { 
    match, history, 
    profile, fetchProfile, clearProfile,
    hideFollowAlert, hideUnfollowAlert,
    hideFollowbackAlert, hideRevokefollowAlert
  } = props;
  const classes = useStyles();
  const { userHandle, tab } = match.params;
  const [openFAlert, setOpenFAlert] = useState(false);
  const [openUAlert, setOpenUAlert] = useState(false);
  const [openFBAlert, setOpenFBAlert] = useState(false);
  const [openUBAlert, setOpenUBAlert] = useState(false);


  useEffect(() => {
    fetchProfile(userHandle);
  }, [userHandle, fetchProfile]);

  useEffect(() => {
    window.onpopstate = () => {
      clearProfile();
    };
  }, [clearProfile]);


  const handleTabsChange = (event, value) => {
    history.push(value);
  };


  const tabs = [];
  tabs.push({ value: 'myarticles', label: 'My Articles' });
  tabs.push({ value: 'favorited', label: 'Favorited Articles' });

  if(!tab){
    return <Redirect to='/myarticles' />;
  }
  if(!tabs.find(t => t.value === tab)) {
    return <Redirect to="/" />;
  }


  const handleFOpen = () => {
    setOpenFAlert(true);
  };

  const handleUOpen = () => {
    setOpenUAlert(true);
  };

  const handleFBOpen = () => {
    setOpenFBAlert(true);
  };

  const handleUBOpen = () => {
    setOpenUBAlert(true);
  };

  const handleFClose = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setOpenFAlert(false);
    hideFollowAlert();
  };

  const handleUClose = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setOpenUAlert(false);
    hideUnfollowAlert();
  };

  const handleFBClose = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setOpenFBAlert(false);
    hideFollowbackAlert();
  };

  const handleUBClose = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setOpenUBAlert(false);
    hideRevokefollowAlert();
  };

  const displayHeader = profile.user ? (
    <Header 
      user={profile.user} 
      openFollowAlert={handleFOpen}
      openUnfollowAlert={handleUOpen} 
      openFollowbackAlert={handleFBOpen}
      openRevokefollowAlert={handleUBOpen}
    />
  ) : (
    <HeaderSkeleton />
  );


  return (
    <div className={classes.root}>
      { displayHeader }
      <Snackbar open={openFAlert} autoHideDuration={4000} onClose={handleFClose}>
        <Alert onClose={handleFClose} severity="success" variant="filled">
          {profile.user && profile.user.handle} Followed Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={openUAlert} autoHideDuration={4000} onClose={handleUClose}>
        <Alert onClose={handleUClose} severity="error" variant="filled">
          {profile.user && profile.user.handle} Unfollowed Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={openFBAlert} autoHideDuration={4000} onClose={handleFBClose}>
        <Alert onClose={handleFBClose} severity="info" variant="filled">
          {profile.user && profile.user.handle} Followed Back Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={openUBAlert} autoHideDuration={4000} onClose={handleUBClose}>
        <Alert onClose={handleUBClose} severity="warning" variant="filled">
          {profile.user && profile.user.handle} Unfollowed Back Successfully
        </Alert>
      </Snackbar>
      <Grid className={classes.feed} container spacing={1}>
        <Grid
          item 
          sm={12} 
          xs={12}
          className={classes.box}
        >
          <Tabs
            className={classes.tabs}
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={tab}
            variant="scrollable"
          >
            {tabs.map(tab => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider className={classes.divider} />
          <div className={classes.content}>
            {/* {console.log(location.pathname)} */}
            {tab === 'myarticles' && <MyArticles screams={profile.screams} /> }
            {tab === 'favorited' && <FavoritedArticles screams={profile.screams} /> }
          </div>
        </Grid>
        <Grid item sm={3} xs={12}>
        </Grid>
      </Grid>
    </div>
  );
};


Profile.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  clearProfile: PropTypes.func,
  hideFollowAlert: PropTypes.func.isRequired,
  hideUnfollowAlert: PropTypes.func.isRequired,
  hideFollowbackAlert: PropTypes.func.isRequired,
  hideRevokefollowAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.data.profile,
  loading: state.UI.loading
});

const mapActionsToProps = {
  fetchProfile,
  clearProfile,
  hideFollowAlert,
  hideUnfollowAlert,
  hideFollowbackAlert,
  hideRevokefollowAlert
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(Profile));

