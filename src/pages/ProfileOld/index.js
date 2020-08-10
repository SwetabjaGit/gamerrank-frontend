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
import PropTypes from 'prop-types';

// Components
import Header from './HeaderOld';
import HeaderSkeleton from '../../utils/HeaderSkeleton';
import MyArticles from './MyArticles';
import FavoritedArticles from './FavoritedArticles';
import SnackbarAlert from '../../components/SnackbarAlert';

// Redux Stuff
import { connect } from 'react-redux';
import {
  fetchProfile,
  clearProfile
} from '../../redux/actions/profile';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#F4F6F8'
  },
  box: {
    marginLeft: 100,
    marginRight: 100
  },
  feed: {
    width: '70%',
    maxWidth: '100%',
    margin: '0 auto',
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
    match, history, authenticated, authUser,
    profile, fetchProfile, clearProfile
  } = props;
  const classes = useStyles();
  const { userHandle, tab } = match.params;
  const [openFAlert, setOpenFAlert] = useState(false);
  const [openUAlert, setOpenUAlert] = useState(false);
  const [openFBAlert, setOpenFBAlert] = useState(false);
  const [openUBAlert, setOpenUBAlert] = useState(false);


  useEffect(() => {
    clearProfile();
  }, [clearProfile]);


  useEffect(() => {
    fetchProfile(userHandle);
  }, [userHandle, fetchProfile]);


  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [];
  tabs.push({ value: 'myfeed', label: 'My Articles' });
  tabs.push({ value: 'favorited', label: 'Favorited Articles' });

  if(!tab){
    return <Redirect to='/myfeed' />;
  }
  if(!tabs.find(t => t.value === tab)) {
    return <Redirect to="/" />;
  }

  const handleFClose = () => {
    setOpenFAlert(false);
  };

  const handleUClose = () => {
    setOpenUAlert(false);
  };

  const handleFBClose = () => {
    setOpenFBAlert(false);
  };

  const handleUBClose = () => {
    setOpenUBAlert(false);
  };

  const displayHeader = profile.user ? (
    <Header 
      user={profile.user}
      authenticated={authenticated}
      authUser={authUser}
      openFollowAlert={setOpenFAlert}
      openUnfollowAlert={setOpenUAlert} 
      openFollowbackAlert={setOpenFBAlert}
      openRevokefollowAlert={setOpenUBAlert}
    />
  ) : (
    <HeaderSkeleton />
  );

  return (
    <div className={classes.root}>
      <div className={classes.feed}>
        { displayHeader }
        <Grid container spacing={1}>
          <Grid item md={12} sm={12} xs={12}>
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
              {tab === 'myfeed' && <MyArticles screams={profile.screams} /> }
              {tab === 'favorited' && <FavoritedArticles screams={profile.screams} /> }
            </div>
          </Grid>
        </Grid>
        <SnackbarAlert 
          open={openFAlert}
          onClose={handleFClose}
          type="success"
          message={profile.user && profile.user.handle + 'Followed Successfully'} 
        />  
        <SnackbarAlert 
          open={openUAlert} 
          onClose={handleUClose}
          type="success"
          message={profile.user && profile.user.handle + 'Unfollowed Successfully'}
        />
        <SnackbarAlert 
          open={openFBAlert} 
          onClose={handleFBClose}
          type="success"
          message={profile.user && profile.user.handle + 'Followed Back Successfully'}
        />
        <SnackbarAlert 
          open={openUBAlert} 
          onClose={handleUBClose}
          type="success"
          message={profile.user && profile.user.handle + 'Unfollowed Back Successfully'}
        />
      </div>
    </div>
  );
};


Profile.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  authUser: PropTypes.string,
  fetchProfile: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  profile: state.profile.profile,
  loading: state.UI.loading,
  authUser: state.user.credentials.handle,
});

const mapActionsToProps = {
  fetchProfile,
  clearProfile,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(Profile));

